import path from "path";
import WebpackPluginAddEntries from "./webpack-plugin-add-entries";
import { Compiler, Entry } from "webpack";
import { ReplaceSource } from "webpack-sources";
import VirtualModulesPlugin from "webpack-virtual-modules";
import sortKeys from "sort-keys";
import moduleName from "../shared/module-name";
import {
  VIRTUAL_BROWSER_INVALIDATE_PATH,
  VIRTUAL_SERVER_MANIFEST_PATH,
  registerVirtualModules
} from "../shared/virtual";

const MANIFEST_MARKER = "$__MARKO_MANIFEST__$";
const MANIFEST_CONTENT = `module.exports = ${MANIFEST_MARKER}`;

interface ResolvablePromise<T> extends Promise<T> {
  resolve(value: T): void;
}

interface Options {
  getClientCompilerName?($global): string;
}

export default class MarkoWebpackPlugin {
  private serverIsBuilding = true;
  private totalBrowserCompilers = 0;
  private pendingBrowserBuilds: Array<Promise<void>> = [];
  private clientEntries = createDeferredPromise<Entry>();
  private clientAssets: {
    [entryName: string]: {
      [bundleName: string]: { [assetType: string]: string[] };
    };
  } = {};
  private getClientCompilerNameSource: string;
  private virtualServerModules = new VirtualModulesPlugin({
    [VIRTUAL_SERVER_MANIFEST_PATH]: MANIFEST_CONTENT
  });

  constructor(options?: Options) {
    if (options && options.getClientCompilerName) {
      this.getClientCompilerNameSource = options.getClientCompilerName.toString();

      if (
        /^getClientCompilerName\s*\(/.test(this.getClientCompilerNameSource)
      ) {
        this.getClientCompilerNameSource = `function ${this.getClientCompilerNameSource}`;
      }
    }
  }

  // Overwritten by each compiler.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private invalidateBrowserBuild(): void {}

  private invalidateServerBuild(): void {
    if (!this.serverIsBuilding) {
      this.virtualServerModules.writeModule(
        VIRTUAL_SERVER_MANIFEST_PATH,
        MANIFEST_CONTENT
      );
    }
  }

  get server() {
    return (compiler: Compiler): void => {
      const seenEntries = new Set();
      const isEvalDevtool = String(compiler.options.devtool).includes("eval");
      const escapeIfEval = (code: string): string =>
        isEvalDevtool ? JSON.stringify(code).slice(1, -1) : code;

      registerVirtualModules(compiler, this.virtualServerModules);

      compiler.hooks.invalid.tap("MarkoWebpackServer:invalid", () => {
        this.serverIsBuilding = true;
        this.clientEntries = createDeferredPromise<Entry>();
      });

      compiler.hooks.normalModuleFactory.tap(
        "MarkoWebpackServer:normalModuleFactory",
        normalModuleFactory => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "MarkoWebpackServer:resolver",
            data => {
              if (
                data.request.endsWith(".marko") &&
                (!data.contextInfo.issuer ||
                  data.contextInfo.issuer.endsWith(".js"))
              ) {
                data.request = data.request + "?assets";
              }
            }
          );
        }
      );
      compiler.hooks.thisCompilation.tap(
        "MarkoWebpackServer:compilation",
        compilation => {
          const entryTemplates = [];
          compilation.hooks.normalModuleLoader.tap(
            "MarkoWebpackServer:normalModuleLoader",
            (_, mod): void => {
              const resource = ((mod as unknown) as { resource: string })
                .resource;
              if (resource.endsWith(".marko?assets")) {
                entryTemplates.push(
                  resource.replace(/\.marko\?assets$/, ".marko")
                );
              }
            }
          );
          compilation.hooks.finishModules.tap(
            "MarkoWebpackServer:finishModules",
            () => {
              let hasNew = false;
              const clientEntries = {};
              entryTemplates.forEach(filename => {
                if (!seenEntries.has(filename)) {
                  hasNew = true;
                  seenEntries.add(filename);
                }

                clientEntries[moduleName(filename)] = filename + "?hydrate";
              });

              if (hasNew) {
                this.invalidateBrowserBuild();
              }

              this.clientEntries.resolve(clientEntries);
            }
          );
          compilation.hooks.optimizeChunkAssets.tapPromise(
            "MarkoWebpackServer:optimizeChunkAssets",
            async () => {
              await Promise.all(this.pendingBrowserBuilds);
              const clientAssets = sortKeys(this.clientAssets, { deep: true });
              this.pendingBrowserBuilds = [];
              this.serverIsBuilding = false;

              for (const filename in compilation.assets) {
                if (filename.endsWith(".js")) {
                  const originalSource = compilation.assets[
                    filename
                  ].source() as string;
                  const placeholder = escapeIfEval(MANIFEST_MARKER);
                  const placeholderPosition = originalSource.indexOf(
                    placeholder
                  );
                  if (placeholderPosition > -1) {
                    const content = escapeIfEval(
                      `{\n  getBundleName: ${
                        this.getClientCompilerNameSource
                      },\n  entries: ${JSON.stringify(clientAssets)}\n}`
                    );
                    const newSource = new ReplaceSource(
                      compilation.assets[filename],
                      filename
                    );
                    newSource.replace(
                      placeholderPosition,
                      placeholderPosition + placeholder.length - 1,
                      content
                    );

                    compilation.assets[filename] = newSource;
                  }
                }
              }
            }
          );
        }
      );
    };
  }
  get browser() {
    this.totalBrowserCompilers++;

    return (compiler: Compiler): void => {
      if (!this.getClientCompilerNameSource) {
        if (this.totalBrowserCompilers > 1) {
          throw new Error(
            "@marko/webpack requires the 'getClientCompilerName' option when using multiple browser compilers."
          );
        }

        this.getClientCompilerNameSource = `function(){return ${JSON.stringify(
          compiler.options.name
        )}}`;
      }

      let isWatchMode = false;
      let pendingBuild = createDeferredPromise<void>();
      const virtualModules = new VirtualModulesPlugin({
        [VIRTUAL_BROWSER_INVALIDATE_PATH]: ""
      });

      registerVirtualModules(compiler, virtualModules);
      this.pendingBrowserBuilds.push(pendingBuild);

      compiler.hooks.watchRun.tap("MarkoWebpackBrowser:watch", () => {
        const { invalidateBrowserBuild } = this;
        isWatchMode = true;

        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.invalidateBrowserBuild = () => {
          if (pendingBuild !== undefined) {
            virtualModules.writeModule(VIRTUAL_BROWSER_INVALIDATE_PATH, "");
          }

          invalidateBrowserBuild();
        };
      });

      compiler.hooks.invalid.tap("MarkoWebpackBrowser:invalid", () => {
        this.invalidateServerBuild();
        pendingBuild = createDeferredPromise();
        this.pendingBrowserBuilds.push(pendingBuild);
      });

      compiler.hooks.done.tap("MarkoWebpackBrowser:done", stats => {
        for (const [entryName, { assets }] of Object.entries(
          stats.toJson().entrypoints
        )) {
          const assetsByType = {};
          for (const asset of assets) {
            const ext = path.extname(asset).slice(1);
            const type = (assetsByType[ext] = assetsByType[ext] || []);
            type.push(asset);
          }

          const entryAssets = (this.clientAssets[entryName] =
            this.clientAssets[entryName] || {});
          entryAssets[compiler.options.name] = assetsByType;
        }

        pendingBuild.resolve();
        pendingBuild = undefined;
      });
      new WebpackPluginAddEntries({
        addNamed: () =>
          this.clientEntries.then(entries =>
            isWatchMode
              ? { ...entries, __INVALIDATE__: VIRTUAL_BROWSER_INVALIDATE_PATH }
              : entries
          )
      }).apply(compiler);
    };
  }
}

const createDeferredPromise = <T>() => {
  let resolve: (value: T) => void;
  const promise = new Promise(
    _resolve => (resolve = _resolve)
  ) as ResolvablePromise<T>;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  promise.resolve = resolve;
  return promise;
};
