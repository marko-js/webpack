import path from "path";
import { promisify } from "util";
import WebpackPluginAddEntries, { emptyEntry } from "./webpack-plugin-add-entries";
import { Compiler } from "webpack";
import { ReplaceSource } from 'webpack-sources';
import moduleName from "../shared/module-name";

export default class MarkoWebpackPlugin {
  options: any;
  clientEntries : any;
  clientAssets : any;
  constructor(options) {
    this.options = options;
    this.clientAssets = createResolvablePromise();
    this.clientEntries = createResolvablePromise();
  }
  get emptyEntry() {
    return emptyEntry;
  }
  get server() {
    return (compiler : Compiler) => {
      const isEvalDevtool = /eval/.test(compiler.options.devtool as any);
      const escapeIfEval = (code) => isEvalDevtool ? JSON.stringify(code).slice(1, -1) : code;
      compiler.hooks.normalModuleFactory.tap('MarkoWebpackServer:normalModuleFactory', (normalModuleFactory) => {
        normalModuleFactory.hooks.beforeResolve.tap('MarkoWebpackServer:resolver', (data) => {
          if (/\.marko$/.test(data.request) && (!data.contextInfo.issuer || /\.js$/.test(data.contextInfo.issuer))) {
            data.request = data.request + '?assets';
          }
        });
      });
      compiler.hooks.compilation.tap('MarkoWebpackServer:compilation', (compilation) => {
        let entryTemplates = [];
        compilation.hooks.normalModuleLoader.tap('MarkoWebpackServer:normalModuleLoader', (_, { resource } : any) => {
          if (/\.marko\?assets$/.test(resource)) {
            entryTemplates.push(resource.replace(/\.marko\?assets$/, '.marko'));
          }
        });
        compilation.hooks.finishModules.tap('MarkoWebpackServer:finishModules', () => {
          const clientEntries = {};
          entryTemplates.forEach(filename => {
            clientEntries[moduleName(filename)] = filename + '?hydrate';
          });
          this.clientEntries.resolve(clientEntries);
          this.clientEntries = createResolvablePromise();
        });
        compilation.hooks.optimizeChunkAssets.tapPromise('MarkoWebpackServer:optimizeChunkAssets', async () => {
          const clientAssets = await this.clientAssets;

          for(let filename in compilation.assets) {
            if (filename.endsWith('.js')) {
              const originalSource = compilation.assets[filename].source();
              let newSource;
              for (let moduleId in clientAssets) {
                const placeholder = escapeIfEval(`__ASSETS_MANIFEST__[${JSON.stringify(moduleId)}]`);
                const placeholderPosition = originalSource.indexOf(placeholder);
                if (placeholderPosition > -1) {
                  const assets = clientAssets[moduleId];
                  const content = escapeIfEval(JSON.stringify({ js:assets.js, css:assets.css }));
                  newSource = newSource || new ReplaceSource(compilation.assets[filename], filename);
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
        });
      });
    };
  }
  get browser() {
    return (compiler : Compiler) => {
      compiler.hooks.done.tap('MarkoWebpackBrowser:done', (stats) => {
        const assetsByEntry = {};
        for(let [entryName, { assets }] of Object.entries(stats.toJson().entrypoints as { assets:any })) {
          const assetsByType = {};
          for (let asset of assets) {
            const ext = path.extname(asset).slice(1);
            const type = assetsByType[ext] = assetsByType[ext] || [];
            type.push(asset);
          }
          assetsByEntry[entryName] = assetsByType;
        }
        this.clientAssets.resolve(assetsByEntry);
        this.clientAssets = createResolvablePromise();
      });
      (new WebpackPluginAddEntries({ 
        entries: () => this.clientEntries
      })).apply(compiler);
    };
  }
}

const createResolvablePromise = () => {
  let resolve;
  const promise = new Promise(_resolve => (resolve = _resolve));
  (promise as any).resolve = resolve;
  return promise;
};