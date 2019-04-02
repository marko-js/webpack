import path from "path";
import WebpackPluginAddEntries from "./webpack-plugin-add-entries";
import { Compiler, Entry } from "webpack";
import { ReplaceSource } from "webpack-sources";
import moduleName from "../shared/module-name";

interface ResolvablePromise<T> extends Promise<T> {
  resolve(value: T): void;
}

interface Options {
  chooseClientCompilerByName?($global: any): string;
}

export default class MarkoWebpackPlugin {
  private totalBrowserCompilers = 0;
  private pendingBrowserBuilds: Array<Promise<void>> = [];
  private clientEntries = createResolvablePromise<Entry>();
  private clientAssets: {
    [entryName: string]: {
      [bundleName: string]: { [assetType: string]: string[] };
    };
  } = {};
  private chooseClientCompilerFnSource: string;

  constructor(options?: Options) {
    if (options && options.chooseClientCompilerByName) {
      this.chooseClientCompilerFnSource = options.chooseClientCompilerByName.toString();

      if (
        this.chooseClientCompilerFnSource[0] !== "(" &&
        !this.chooseClientCompilerFnSource.startsWith("function ")
      ) {
        this.chooseClientCompilerFnSource = `function ${
          this.chooseClientCompilerFnSource
        }`;
      }
    }
  }

  get server() {
    return (compiler: Compiler) => {
      const isEvalDevtool = /eval/.test(String(compiler.options.devtool));
      const escapeIfEval = (code: string) =>
        isEvalDevtool ? JSON.stringify(code).slice(1, -1) : code;
      compiler.hooks.normalModuleFactory.tap(
        "MarkoWebpackServer:normalModuleFactory",
        normalModuleFactory => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "MarkoWebpackServer:resolver",
            data => {
              if (
                /\.marko$/.test(data.request) &&
                (!data.contextInfo.issuer ||
                  /\.js$/.test(data.contextInfo.issuer))
              ) {
                data.request = data.request + "?assets";
              }
            }
          );
        }
      );
      compiler.hooks.compilation.tap(
        "MarkoWebpackServer:compilation",
        compilation => {
          const entryTemplates = [];
          compilation.hooks.normalModuleLoader.tap(
            "MarkoWebpackServer:normalModuleLoader",
            (_, { resource }: { resource: string }) => {
              if (/\.marko\?assets$/.test(resource)) {
                entryTemplates.push(
                  resource.replace(/\.marko\?assets$/, ".marko")
                );
              }
            }
          );
          compilation.hooks.finishModules.tap(
            "MarkoWebpackServer:finishModules",
            () => {
              const clientEntries = {};
              entryTemplates.forEach(filename => {
                clientEntries[moduleName(filename)] = filename + "?hydrate";
              });

              this.clientEntries.resolve(clientEntries);
              this.clientEntries = createResolvablePromise() as ResolvablePromise<
                Entry
              >;
            }
          );
          compilation.hooks.optimizeChunkAssets.tapPromise(
            "MarkoWebpackServer:optimizeChunkAssets",
            async () => {
              await Promise.all(this.pendingBrowserBuilds);
              const { clientAssets } = this;
              this.pendingBrowserBuilds = [];
              for (const filename in compilation.assets) {
                if (filename.endsWith(".js")) {
                  const originalSource = compilation.assets[
                    filename
                  ].source() as string;
                  let newSource: ReplaceSource | void;

                  for (const entry in clientAssets) {
                    const placeholder = escapeIfEval(
                      `__ASSETS_MANIFEST__[${JSON.stringify(entry)}]`
                    );
                    const placeholderPosition = originalSource.indexOf(
                      placeholder
                    );
                    if (placeholderPosition > -1) {
                      const assetsByBundle = clientAssets[entry];
                      const content = escapeIfEval(
                        `{\n  getBundleName: ${
                          this.chooseClientCompilerFnSource
                        },\n  bundles: ${JSON.stringify(
                          Object.keys(assetsByBundle)
                            .sort()
                            .reduce((r, k) => {
                              r[k] = assetsByBundle[k];
                              return r;
                            }, {})
                        )}\n}`
                      );
                      newSource =
                        newSource ||
                        new ReplaceSource(
                          compilation.assets[filename],
                          filename
                        );
                      newSource.replace(
                        placeholderPosition,
                        placeholderPosition + placeholder.length - 1,
                        content
                      );
                    }
                  }
                  if (newSource) {
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

    return (compiler: Compiler) => {
      if (!this.chooseClientCompilerFnSource) {
        if (this.totalBrowserCompilers > 1) {
          throw new Error(
            "@marko/webpack requires the 'chooseClientCompilerByName' option when using multiple browser compilers."
          );
        }

        this.chooseClientCompilerFnSource = `function(){return ${JSON.stringify(
          compiler.options.name
        )}}`;
      }

      let pendingBuild = createResolvablePromise<void>();
      this.pendingBrowserBuilds.push(pendingBuild);

      compiler.hooks.invalid.tap("MarkoWebpackBrowser:invalid", () => {
        pendingBuild = createResolvablePromise();
        this.pendingBrowserBuilds.push(pendingBuild);
      });

      compiler.hooks.done.tap("MarkoWebpackBrowser:done", stats => {
        for (const [entryName, { assets }] of Object.entries(stats.toJson()
          .entrypoints as { assets: any })) {
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
      });
      new WebpackPluginAddEntries({
        addNamed: () => this.clientEntries
      }).apply(compiler);
    };
  }
}

const createResolvablePromise = <T>() => {
  let resolve: (value: T) => void;
  const promise = new Promise(
    _resolve => (resolve = _resolve)
  ) as ResolvablePromise<T>;

  promise.resolve = resolve;
  return promise;
};
