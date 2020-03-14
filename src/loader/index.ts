"use strict";

import * as path from "path";
import { Compiler } from 'webpack';
import * as loaderUtils from "loader-utils";
import ConcatMap from "concat-with-sourcemaps";
import getAssetCode from "./get-asset-code";
import { getVirtualModules } from "../shared/virtual";
import pluginOptionsForCompiler from "../shared/plugin-options-for-compiler";

const watchFiles = {
  style: {
    extensions: [".css", ".less", ".scss", ".stylus"],
    has(meta): boolean {
      return Boolean(
        meta.deps &&
          meta.deps.some(dep => {
            switch (typeof dep) {
              case "string":
                return watchFiles.style.extensions.includes(path.extname(dep));
              case "object":
                return watchFiles.style.extensions.includes(`.${dep.type}`);
            }
          })
      );
    }
  },
  component: {
    extensions: [".js", ".ts"],
    has(meta): boolean {
      return Boolean(meta.component);
    }
  },
  "component-browser": {
    extensions: [".js", ".ts"],
    has(meta): boolean {
      return (
        meta.deps &&
        meta.deps.some(dep => {
          return (
            typeof dep === "string" &&
            watchFiles["component-browser"].extensions.includes(
              path.extname(dep)
            )
          );
        })
      );
    }
  }
};

const DEFAULT_COMPILER = require.resolve("marko/compiler");
const cacheClearSetup = new WeakMap();
const browserJSONPrefix = "package: ";
let supportsBrowserJSON: boolean;

export default function(source: string): string {
  const compiler = this._compiler as Compiler;

  if (supportsBrowserJSON === undefined) {
    const resolveOptions = compiler.options.resolve;
    const compilerExtensions =
      (resolveOptions && resolveOptions.extensions) || [];
    supportsBrowserJSON = compilerExtensions.includes(".browser.json");
  }

  const pluginOptions = pluginOptionsForCompiler.get(compiler);
  const queryOptions = loaderUtils.getOptions(this); // Not the same as this.options
  const target = normalizeTarget(
    (queryOptions && queryOptions.target) || this.target
  );
  const runtimeId = pluginOptions && pluginOptions.runtimeId;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const markoCompiler = require((queryOptions && queryOptions.compiler) ||
    DEFAULT_COMPILER);

  const loadStr = isMarko4Compiler(markoCompiler) ? requireStr : importStr;

  const babelConfig = Object.assign(
    {},
    queryOptions && queryOptions.babelConfig
  );
  babelConfig.caller = Object.assign(
    {
      name: "@marko/webpack/loader",
      target: this.target,
      supportsStaticESM: true,
      supportsDynamicImport: true,
      supportsTopLevelAwait: true
    },
    babelConfig.caller
  );

  const dependenciesOnly = this.resource.endsWith("?dependencies");
  const hydrate = this.resource.endsWith("?hydrate");
  const assets = this.resource.endsWith("?assets");
  let sourceMaps =
    !queryOptions || queryOptions.sourceMaps === undefined
      ? this.sourceMap
      : queryOptions.sourceMaps;

  if (sourceMaps === "inline") {
    sourceMaps = true;
  }

  this.cacheable(false);
  if (!cacheClearSetup.has(this._compiler)) {
    this._compiler.hooks.watchRun.tap("clearMarkoTaglibCache", () => {
      markoCompiler.clearCaches();
    });
    cacheClearSetup.set(this._compiler, true);
  }

  if (assets) {
    return markoCompiler.compile(
      getAssetCode(this.resourcePath, runtimeId),
      this.resourcePath,
      {
        writeToDisk: false,
        requireTemplates: true,
        writeVersionComment: false,
        babelConfig
      }
    );
  } else if (hydrate) {
    return `
      if (window.$mwp) {
        __webpack_public_path__ = $mwp;
      }

      ${loadStr(`./${path.basename(this.resourcePath)}?dependencies`)}
      ${runtimeId
        ? `
          ${loadStr("marko/components", "{ init }")}
          init(${runtimeId});
        `
        : "window.$initComponents && $initComponents();"
      }
      
    `;
  } else if (target !== "server" && markoCompiler.compileForBrowser) {
    const { code, meta, map } = markoCompiler.compileForBrowser(
      source,
      this.resourcePath,
      {
        sourceOnly: false,
        writeToDisk: false,
        writeVersionComment: false,
        sourceMaps,
        babelConfig
      }
    );

    getMissingWatchDeps(this.resourcePath, meta).forEach(dep =>
      this.addDependency(dep)
    );

    let dependencies = [];

    if (dependenciesOnly && meta.component) {
      dependencies = dependencies.concat(`
      ${loadStr("marko/components", "{ register }")}
      ${loadStr(meta.component, "component")}
      register(${JSON.stringify(meta.id)}, component);
      `);
    }

    if (meta.deps) {
      dependencies = dependencies.concat(
        meta.deps
          .map(dependency => {
            if (!dependency.code) {
              if (dependency.startsWith(browserJSONPrefix)) {
                if (supportsBrowserJSON) {
                  dependency = dependency.slice(browserJSONPrefix.length);
                } else {
                  return ""; // Do not load browser.json dependencies by default.
                }
              }

              // external file, just require it
              return loadStr(dependency);
            } else {
              // inline content, we'll create a virtual dependency.
              const virtualPath = path.resolve(
                path.dirname(this.resourcePath),
                dependency.virtualPath
              );
              const virtualModules = getVirtualModules(this._compiler);
              virtualModules.writeModule(virtualPath, dependency.code);
              return loadStr(dependency.virtualPath);
            }
          })
          .filter(Boolean)
      );
    }

    if (dependenciesOnly && meta.tags) {
      // we need to also include the dependencies of
      // any tags that are used by this template
      dependencies = dependencies.concat(
        meta.tags
          .filter(tagPath => tagPath.endsWith(".marko"))
          .map(tagPath => loadStr(tagPath + "?dependencies"))
      );
    }

    if (!dependenciesOnly) {
      if (map) {
        if (dependencies.length) {
          const concat = new ConcatMap(true, "", ";");
          concat.add(null, dependencies.join("\n"));
          concat.add(this.resource, code, map);
          return this.callback(null, concat.content, concat.sourceMap);
        } else {
          this.callback(null, code, map);
        }
      } else {
        dependencies.push(code);
      }
    }

    return dependencies.join("\n");
  } else {
    const { code, meta, map } = markoCompiler.compile(
      source,
      this.resourcePath,
      {
        sourceOnly: false,
        writeToDisk: false,
        requireTemplates: true,
        writeVersionComment: false,
        sourceMaps,
        babelConfig
      }
    );

    getMissingWatchDeps(this.resourcePath, meta).forEach(dep =>
      this.addDependency(dep)
    );

    return this.callback(null, code, map);
  }
}

function getMissingWatchDeps(resource: string, meta): string[] {
  const watchDeps = [];
  const templateFileName = path.basename(resource, ".marko");
  const isIndex = templateFileName === "index";
  const depPathPrefix = isIndex ? "./" : `./${templateFileName}.`;
  for (const name in watchFiles) {
    const prefix = depPathPrefix + name;
    const { extensions, has } = watchFiles[name];
    if (!has(meta)) {
      for (const ext of extensions) {
        watchDeps.push(prefix + ext);
      }
    }
  }

  return watchDeps;
}

function isMarko4Compiler(compiler) {
  return Boolean(compiler.builder);
}

function importStr(request: string, lhs?: string) {
  const id = JSON.stringify(request);

  if (lhs) {
    return `import ${lhs} from ${id};`;
  }

  return `import ${id};`;
}

function requireStr(request: string, lhs?: string) {
  const id = JSON.stringify(request);

  if (lhs) {
    return `const ${lhs} = require(${id});`;
  }

  return `require(${id});`;
}

function normalizeTarget(target: string): string {
  switch (target) {
    case "server":
    case "node":
    case "async-node":
    case "atom":
    case "electron":
    case "electron-main":
      return "server";
    default:
      return "browser";
  }
}
