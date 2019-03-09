import path from "path";
import WebpackPluginAddEntries from "./webpack-plugin-add-entries";
import { Compiler, Entry } from "webpack";
import { ReplaceSource } from "webpack-sources";
import moduleName from "../shared/module-name";

interface ResolvablePromise<T> extends Promise<T> {
  resolve(value?: T): void;
}

export default class MarkoWebpackPlugin {
  public options: any;
  private clientEntries: ResolvablePromise<Entry>;
  private clientAssets: any;
  private pendingBrowserBuild: any;
  constructor(options: any) {
    this.options = options;
    this.clientEntries = createResolvablePromise();
    this.pendingBrowserBuild = createResolvablePromise();
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
            (_, module: { resource: string }) => {
              if (/\.marko\?assets$/.test(module.resource)) {
                const templatePath = module.resource.replace(
                  /\.marko\?assets$/,
                  ".marko"
                );
                entryTemplates.push(templatePath);
                module.resource = `${require.resolve(
                  "./asset-injection.marko"
                )}?template=${encodeURIComponent(templatePath)}`;
              }
            }
          );
          compilation.hooks.finishModules.tap(
            "MarkoWebpackServer:finishModules",
            () => {
              const clientEntries = {};
              entryTemplates.forEach(filename => {
                clientEntries[moduleName(filename)] =
                  filename + "?dependencies";
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
              await this.pendingBrowserBuild;
              const { clientAssets } = this;

              for (const filename in compilation.assets) {
                if (filename.endsWith(".js")) {
                  const originalSource = compilation.assets[
                    filename
                  ].source() as string;
                  let newSource: ReplaceSource | void;
                  for (const moduleId in clientAssets) {
                    const placeholder = escapeIfEval(
                      `__ASSETS_MANIFEST__[${JSON.stringify(moduleId)}]`
                    );
                    const placeholderPosition = originalSource.indexOf(
                      placeholder
                    );
                    if (placeholderPosition > -1) {
                      const assets = clientAssets[moduleId];
                      const content = escapeIfEval(
                        JSON.stringify({ js: assets.js, css: assets.css })
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
    return (compiler: Compiler) => {
      compiler.hooks.invalid.tap("MarkoWebpackBrowser:invalid", () => {
        this.pendingBrowserBuild = createResolvablePromise();
      });

      compiler.hooks.done.tap("MarkoWebpackBrowser:done", stats => {
        const assetsByEntry = {};
        for (const [entryName, { assets }] of Object.entries(stats.toJson()
          .entrypoints as { assets: any })) {
          const assetsByType = {};
          for (const asset of assets) {
            const ext = path.extname(asset).slice(1);
            const type = (assetsByType[ext] = assetsByType[ext] || []);
            type.push(asset);
          }
          assetsByEntry[entryName] = assetsByType;
        }

        this.clientAssets = assetsByEntry;
        this.pendingBrowserBuild.resolve();
      });
      new WebpackPluginAddEntries({
        addNamed: () => this.clientEntries
      }).apply(compiler);
    };
  }
}

const createResolvablePromise = () => {
  let resolve: (value?: any) => void;
  const promise = new Promise(
    _resolve => (resolve = _resolve)
  ) as ResolvablePromise<any>;
  promise.resolve = resolve;
  return promise;
};
