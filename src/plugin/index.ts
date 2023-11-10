import path from "path";
import sortKeys from "sort-keys";
import * as webpack from "webpack";
import { MANIFEST_PLACEHOLDER } from "../shared/manifest";
import moduleName from "../shared/module-name";

const WEBPACK_5 =
  parseInt(webpack.version.slice(0, webpack.version.indexOf(".")), 10) >= 5;

interface ResolvablePromise<T> extends Promise<T> {
  resolve(value: T): void;
}

declare module "webpack" {
  interface Compiler {
    watchMode?: boolean;
    watching?: webpack.Watching;
    markoCompileCache?: Map<unknown, unknown>;
    markoPluginOptions?: MarkoWebpackPlugin["options"];
    markoAssetsPending?: ResolvablePromise<void>;
    markoAssetsRead?: boolean;
    markoEntriesPending?: ResolvablePromise<void>;
    markoEntriesRead?: boolean;
  }
}

export default class MarkoWebpackPlugin {
  private compileCache = new Map<unknown, unknown>();
  private serverCompiler: webpack.Compiler;
  private browserCompilers: webpack.Compiler[] = [];
  private clientEntries: { [x: string]: string } = {};
  private clientAssets: {
    [buildName: string]: {
      [entryName: string]: { [assetType: string]: string[] };
    };
  } = {};

  constructor(private options: { runtimeId?: string } = {}) {
    this.options = { ...options };

    if (this.options.runtimeId) {
      this.options.runtimeId = normalizeRuntimeId(this.options.runtimeId);
    }
  }

  get server() {
    return (compiler: webpack.Compiler): void => {
      const isEvalDevtool = String(compiler.options.devtool).includes("eval");
      const escapeIfEval = (code: string): string =>
        isEvalDevtool ? JSON.stringify(code).slice(1, -1) : code;
      this.serverCompiler = compiler;

      addLoaderAlias(compiler.options);
      patchWatchingWebpack4(compiler);
      compiler.markoAssetsRead = false;
      compiler.markoPluginOptions = this.options;
      compiler.markoCompileCache = this.compileCache;
      compiler.markoEntriesPending = createDeferredPromise<void>();

      compiler.hooks.invalid.tap("MarkoWebpackServer:invalid", () => {
        compiler.markoAssetsRead = false;
        compiler.markoEntriesPending ??= createDeferredPromise<void>();
      });

      compiler.hooks.normalModuleFactory.tap(
        "MarkoWebpackServer:normalModuleFactory",
        normalModuleFactory => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "MarkoWebpackServer:resolver",
            (data: { request: string; contextInfo: { issuer?: string } }) => {
              const { issuer } = data.contextInfo;
              if (
                data.request.endsWith(".marko") &&
                (!issuer ||
                  !(
                    issuer.endsWith(".marko") ||
                    /[/\\]node_modules[/\\]/.test(issuer)
                  ))
              ) {
                data.request = `${data.request}?server-entry`;
              }
            }
          );
        }
      );

      compiler.hooks.thisCompilation.tap(
        "MarkoWebpackServer:compilation",
        compilation => {
          if (!this.options.runtimeId && compilation.outputOptions.uniqueName) {
            this.options.runtimeId = normalizeRuntimeId(
              compilation.outputOptions.uniqueName
            );
          }

          compilation.hooks.finishModules.tap(
            "MarkoWebpackServer:finishModules",
            modules => {
              let hasChangedEntries = false;
              const removedEntryIds = new Set(Object.keys(this.clientEntries));

              for (const mod of modules) {
                const resource = (mod as typeof mod & { resource?: string })
                  .resource;

                if (resource && resource.endsWith(".marko?server-entry")) {
                  const filename = resource.replace(/\?server-entry$/, "");
                  const entryTemplateId = moduleName(filename);

                  if (!removedEntryIds.delete(entryTemplateId)) {
                    hasChangedEntries = true;
                    this.clientEntries[
                      entryTemplateId
                    ] = `${filename}?browser-entry`;
                  }
                }
              }

              for (const removedEntryId of removedEntryIds) {
                hasChangedEntries = true;
                delete this.clientEntries[removedEntryId];
                for (const compilerName in this.clientAssets) {
                  delete this.clientAssets[compilerName][removedEntryId];
                }
              }

              if (hasChangedEntries) {
                for (const browserCompiler of this.browserCompilers) {
                  if (browserCompiler.markoEntriesRead) {
                    browserCompiler.watching?.invalidate();
                  }
                }
              }

              compiler.markoEntriesPending.resolve();
              compiler.markoEntriesPending = undefined;
            }
          );

          (WEBPACK_5
            ? (compilation as any).hooks.processAssets
            : compilation.hooks.optimizeChunkAssets
          ).tapPromise(
            {
              name: "MarkoWebpackServer:optimizeChunkAssets",
              stage: WEBPACK_5
                ? (webpack as any).Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
                : undefined
            },
            async () => {
              await Promise.all(
                this.browserCompilers.map(it => it.markoAssetsPending)
              );

              compiler.markoAssetsRead = true;
              const clientAssets = sortKeys(this.clientAssets, { deep: true });

              for (const chunk of compilation.chunks) {
                if (!chunk.canBeInitial()) {
                  continue;
                }

                for (const file of chunk.files) {
                  compilation.updateAsset(file, old => {
                    const placeholder = escapeIfEval(MANIFEST_PLACEHOLDER);
                    const placeholderPosition = (old.source() as string).indexOf(
                      placeholder
                    );
                    if (placeholderPosition > -1) {
                      const hasMultipleBuilds =
                        this.browserCompilers.length > 1;

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
  build: ${JSON.stringify(clientAssets[this.browserCompilers[0].name])}
}`
                      );

                      const sources = (compiler as any).webpack
                        ? (compiler as any).webpack.sources
                        : require("webpack-sources");
                      const newSource = new sources.ReplaceSource(
                        (old as any).original ? (old as any).original() : old
                      );
                      newSource.replace(
                        placeholderPosition,
                        placeholderPosition + placeholder.length - 1,
                        content
                      );

                      return newSource;
                    }

                    return old;
                  });
                }
              }
            }
          );
        }
      );
    };
  }
  get browser() {
    return (compiler: webpack.Compiler): void => {
      const compilerName = compiler.options.name;
      const entryOption = compiler.options.entry;
      this.browserCompilers.push(compiler);

      addLoaderAlias(compiler.options);
      patchWatchingWebpack4(compiler);
      compiler.markoEntriesRead = false;
      compiler.markoPluginOptions = this.options;
      compiler.markoCompileCache = this.compileCache;

      compiler.options.entry = async () => {
        await this.serverCompiler.markoEntriesPending;
        compiler.markoEntriesRead = true;

        let normalizedEntries = this.clientEntries;

        if (WEBPACK_5) {
          normalizedEntries = {};
          for (const key in this.clientEntries) {
            (normalizedEntries as any)[key] = {
              import: [this.clientEntries[key]]
            };
          }
        }

        if (isDefaultEntry(entryOption)) {
          return normalizedEntries;
        }

        const currentEntry =
          typeof entryOption === "function" ? await entryOption() : entryOption;

        if (typeof currentEntry === "string" || Array.isArray(currentEntry)) {
          return Object.assign({ main: currentEntry }, normalizedEntries);
        } else if (typeof currentEntry === "object") {
          return { ...currentEntry, ...normalizedEntries };
        }
      };

      compiler.hooks.thisCompilation.tap(
        "MarkoWebpackBrowser:compilation",
        compilation => {
          compiler.markoEntriesRead = false;
          const prevPendingAssets = compiler.markoAssetsPending;
          const pendingAssets = (compiler.markoAssetsPending = createDeferredPromise());

          if (prevPendingAssets !== undefined) {
            // If multiple compilations started, the last one always is treated
            // as the source of truth.
            pendingAssets.finally(() => prevPendingAssets.resolve());
          }

          compilation.hooks.afterOptimizeAssets.tap(
            "MarkoWebpackBrowser:afterProcessAssets",
            () => {
              if (pendingAssets !== compiler.markoAssetsPending) {
                return;
              }

              for (const [entryName, { chunks }] of compilation.entrypoints) {
                const assetsByType: { [x: string]: string[] } = {};

                for (const { files } of chunks) {
                  if (files) {
                    for (const asset of files) {
                      if (compilation.assets[asset].size() === 0) {
                        if (WEBPACK_5) {
                          (compilation as any).deleteAsset(asset);
                        } else {
                          delete compilation.assets[asset];
                        }

                        continue;
                      }
                      const ext = path.extname(asset).slice(1);
                      const type = (assetsByType[ext] =
                        assetsByType[ext] || []);
                      type.push(asset);
                    }
                  }
                }

                const buildAssets = (this.clientAssets[compilerName] =
                  this.clientAssets[compilerName] || {});
                buildAssets[entryName] = assetsByType;
              }

              if (this.serverCompiler.markoAssetsRead) {
                this.serverCompiler.watching?.invalidate();
              }

              compiler.markoAssetsPending = undefined;
              pendingAssets.resolve();
            }
          );
        }
      );
    };
  }
}

function patchWatchingWebpack4(compiler: webpack.Compiler) {
  if (!WEBPACK_5) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { watch } = compiler;
    compiler.watch = (...args) => {
      return (compiler.watching = watch.apply(compiler, args));
    };
  }
}

function normalizeRuntimeId(id: string) {
  return id.replace(/[^a-z0-9$_]/gi, "_");
}

function addLoaderAlias(config: webpack.Configuration) {
  const resolveLoader = (config.resolveLoader ??= {});
  const resolveLoaderAlias = (resolveLoader.alias ??= {});
  resolveLoaderAlias["@marko/webpack/loader"] = require.resolve("../loader");
}

function isDefaultEntry(entry: unknown) {
  if (WEBPACK_5) {
    if (typeof entry === "object") {
      for (const key in entry) {
        if (key !== "main") {
          return false;
        }

        for (const _ in entry[key]) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  return entry === "./src";
}

function createDeferredPromise<T>() {
  let resolve: (value: T) => void;
  const promise = new Promise(_resolve => {
    resolve = _resolve;
  }) as ResolvablePromise<T>;

  promise.resolve = resolve;
  return promise;
}
