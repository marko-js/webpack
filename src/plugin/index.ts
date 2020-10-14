import path from "path";
import WebpackPluginAddEntries from "./webpack-plugin-add-entries";
import { Compiler, Entry, NormalModule, Compilation } from "webpack";
import { ReplaceSource } from "webpack-sources";
import VirtualModulesPlugin from "webpack-virtual-modules";
import sortKeys from "sort-keys";
import moduleName from "../shared/module-name";
import pluginOptionsForCompiler from "../shared/plugin-options-for-compiler";

import {
  VIRTUAL_BROWSER_INVALIDATE_PATH,
  VIRTUAL_SERVER_MANIFEST_PATH,
  registerVirtualModules,
} from "../shared/virtual";

const MANIFEST_MARKER = "$__MARKO_MANIFEST__$";
const MANIFEST_CONTENT = `module.exports = ${MANIFEST_MARKER}`;

interface ResolvablePromise<T> extends Promise<T> {
  resolve(value: T): void;
}

export default class MarkoWebpackPlugin {
  private serverIsBuilding = true;
  private browserCompilerNames: string[] = [];
  private pendingBrowserBuilds: Array<Promise<void>> = [];
  private pendingFinishModules = createDeferredPromise<void>();
  private clientEntries: Entry = {};
  private clientAssets: {
    [buildName: string]: {
      [entryName: string]: { [assetType: string]: string[] };
    };
  } = {};
  private virtualServerModules = new VirtualModulesPlugin({
    [VIRTUAL_SERVER_MANIFEST_PATH]: MANIFEST_CONTENT,
  });

  constructor(private options?: { runtimeId?: string }) {
    this.options = options;
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
      const entryTemplates = new Set<string>();
      const isEvalDevtool = String(compiler.options.devtool).includes("eval");
      const escapeIfEval = (code: string): string =>
        isEvalDevtool ? JSON.stringify(code).slice(1, -1) : code;

      pluginOptionsForCompiler.set(compiler, this.options);

      registerVirtualModules(compiler, this.virtualServerModules);

      compiler.hooks.invalid.tap("MarkoWebpackServer:invalid", () => {
        this.serverIsBuilding = true;
        this.pendingFinishModules = createDeferredPromise<void>();
      });

      compiler.hooks.normalModuleFactory.tap(
        "MarkoWebpackServer:normalModuleFactory",
        (normalModuleFactory) => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "MarkoWebpackServer:resolver",
            (data) => {
              if (
                data.request.endsWith(".marko") &&
                (!data.contextInfo.issuer ||
                  data.contextInfo.issuer.endsWith(".js"))
              ) {
                data.request = `${data.request}?assets`;
              }
            }
          );
        }
      );
      compiler.hooks.thisCompilation.tap(
        "MarkoWebpackServer:compilation",
        (compilation) => {
          NormalModule.getCompilationHooks(compilation).loader.tap(
            "MarkoWebpackServer:normalModuleLoader",
            (_, mod): void => {
              const resource = ((mod as unknown) as { resource: string })
                .resource;
              if (resource.endsWith(".marko?assets")) {
                entryTemplates.add(
                  resource.replace(/\.marko\?assets$/, ".marko")
                );
              }
            }
          );
          compilation.hooks.finishModules.tap(
            "MarkoWebpackServer:finishModules",
            () => {
              let hasChanged = false;

              for (const filename of entryTemplates) {
                const moduleNameForFile = moduleName(filename);
                if (this.clientEntries[moduleNameForFile]) {
                  try {
                    if (
                      !(compilation.inputFileSystem as typeof import("fs"))
                        .statSync(filename)
                        .isFile()
                    ) {
                      throw new Error();
                    }
                  } catch {
                    // entry was removed.
                    hasChanged = true;
                    entryTemplates.delete(filename);
                    delete this.clientEntries[moduleNameForFile];
                  }
                } else {
                  // new entry.
                  hasChanged = true;
                  this.clientEntries[moduleNameForFile] = `${filename}?hydrate`;
                }
              }

              if (hasChanged) {
                this.invalidateBrowserBuild();
              }

              this.pendingFinishModules.resolve();
            }
          );
          compilation.hooks.processAssets.tapPromise(
            {
              name: "MarkoWebpackServer:processAssets",
              stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
            },
            async (assets) => {
              await Promise.all(this.pendingBrowserBuilds);
              const clientAssets = sortKeys(this.clientAssets, { deep: true });
              this.pendingBrowserBuilds = [];
              this.serverIsBuilding = false;

              for (const filename in assets) {
                if (filename.endsWith(".js")) {
                  const asset = compilation.getAsset(filename);
                  const placeholder = escapeIfEval(MANIFEST_MARKER);
                  const placeholderPosition = asset.source
                    .source()
                    .indexOf(placeholder);
                  if (placeholderPosition > -1) {
                    const hasMultipleBuilds =
                      this.browserCompilerNames.length > 1;

                    const content = escapeIfEval(
                      hasMultipleBuilds
                        ? `{
  getAssets(entry, buildName) {
    const buildAssets = this.builds[buildName];
    if (!buildAssets) {
      throw new Error("Unable to load assets for build with a '$global.buildName' of '" + buildName + "'.");
    }

    return buildAssets[entry];
  },
  builds: ${JSON.stringify(clientAssets)}
}`
                        : `{
  getAssets(entry) {
    return this.build[entry];
  },
  build: ${JSON.stringify(clientAssets[this.browserCompilerNames[0]])}
}`
                    );

                    const newSource = new ReplaceSource(asset.source, filename);
                    newSource.replace(
                      placeholderPosition,
                      placeholderPosition + placeholder.length - 1,
                      content
                    );

                    compilation.updateAsset(filename, newSource, asset.info);
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
    return (compiler: Compiler): void => {
      let pendingBuild = createDeferredPromise<void>();
      const compilerName = compiler.options.name;
      const virtualModules = new VirtualModulesPlugin({
        [VIRTUAL_BROWSER_INVALIDATE_PATH]: "",
      });

      pluginOptionsForCompiler.set(compiler, this.options);

      registerVirtualModules(compiler, virtualModules);

      this.browserCompilerNames.push(compilerName);
      this.pendingBrowserBuilds.push(pendingBuild);

      compiler.hooks.watchRun.tap("MarkoWebpackBrowser:watch", () => {
        ((this.clientEntries as unknown) as Record<
          string,
          string
        >).__INVALIDATE__ = VIRTUAL_BROWSER_INVALIDATE_PATH;

        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.invalidateBrowserBuild = () => {
          if (pendingBuild !== undefined) {
            virtualModules.writeModule(VIRTUAL_BROWSER_INVALIDATE_PATH, "");
          }
        };
      });

      compiler.hooks.invalid.tap("MarkoWebpackBrowser:invalid", () => {
        this.invalidateServerBuild();
        pendingBuild = createDeferredPromise();
        this.pendingBrowserBuilds.push(pendingBuild);
      });

      compiler.hooks.done.tap("MarkoWebpackBrowser:done", ({ compilation }) => {
        for (const [entryName, { chunks }] of compilation.entrypoints) {
          const assetsByType: { [x: string]: string[] } = {};

          for (const { files } of chunks) {
            if (files) {
              for (const asset of files) {
                const ext = path.extname(asset).slice(1);
                const type = (assetsByType[ext] = assetsByType[ext] || []);
                type.push(asset);
              }
            }
          }

          const buildAssets = (this.clientAssets[compilerName] =
            this.clientAssets[compilerName] || {});
          buildAssets[entryName] = assetsByType;
        }

        if (pendingBuild as undefined) {
          pendingBuild.resolve();
          pendingBuild = undefined;
        }
      });
      new WebpackPluginAddEntries({
        addNamed: () =>
          this.pendingFinishModules.then(() => this.clientEntries),
      }).apply(compiler);
    };
  }
}

function createDeferredPromise<T>() {
  let resolve: (value: T) => void;
  const promise = new Promise(
    (_resolve) => (resolve = _resolve)
  ) as ResolvablePromise<T>;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  promise.resolve = resolve;
  return promise;
}
