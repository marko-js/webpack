"use strict";

import * as path from "path";
import * as loaderUtils from "loader-utils";
import getAssetCode from "./get-asset-code";
import { getVirtualModules } from "../shared/virtual";

const watchFiles = {
  style: {
    extensions: [".css", ".less", ".scss", ".stylus"],
    has(meta) {
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
    has(meta) {
      return Boolean(meta.component);
    }
  },
  "component-browser": {
    extensions: [".js", ".ts"],
    has(meta) {
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
const isHydrate = /\?hydrate$/;
const isDependencies = /\?dependencies$/;
const isAssets = /\?assets$/;

const DEFAULT_COMPILER = require.resolve("marko/compiler");
const cacheClearSetup = new WeakMap();
const browserJSONPrefix = "package: ";
let supportsBrowserJSON: boolean;

export default function(source: string) {
  if (supportsBrowserJSON === undefined) {
    const resolveOptions = this._compiler.options.resolve;
    const compilerExtensions =
      (resolveOptions && resolveOptions.extensions) || [];
    supportsBrowserJSON = compilerExtensions.indexOf(".browser.json") !== -1;
  }

  const queryOptions = loaderUtils.getOptions(this); // Not the same as this.options
  const target = normalizeTarget(
    (queryOptions && queryOptions.target) || this.target
  );
  const markoCompiler = require((queryOptions && queryOptions.compiler) ||
    DEFAULT_COMPILER);
  const dependenciesOnly = isDependencies.test(this.resource);
  const hydrate = isHydrate.test(this.resource);
  const assets = isAssets.test(this.resource);
  const module = this.options
    ? this.options.module
    : this._compilation.options.module;
  const loaders = (module && (module.loaders || module.rules)) || [];

  this.cacheable(false);
  if (!cacheClearSetup.has(this._compiler)) {
    this._compiler.hooks.watchRun.tap("clearMarkoTaglibCache", () => {
      markoCompiler.clearCaches();
    });
    cacheClearSetup.set(this._compiler, true);
  }

  if (assets) {
    return markoCompiler.compile(
      getAssetCode(this.resourcePath),
      this.resourcePath,
      {
        writeToDisk: false,
        requireTemplates: true
      }
    );
  } else if (hydrate) {
    return `
      if (window.$mwp) {
        __webpack_public_path__ = $mwp;
      }

      require(${JSON.stringify(
        `./${path.basename(this.resourcePath)}?dependencies`
      )});
      window.$initComponents && window.$initComponents();
    `;
  } else if (target !== "server" && markoCompiler.compileForBrowser) {
    const { code, meta } = markoCompiler.compileForBrowser(
      source,
      this.resourcePath,
      {
        writeToDisk: false
      }
    );

    getMissingWatchDeps(this.resourcePath, meta).forEach(dep =>
      this.addDependency(dep)
    );

    let dependencies = [];

    if (dependenciesOnly && meta.component) {
      dependencies = dependencies.concat(`
        require('marko/components').register(
          ${JSON.stringify(meta.id)},
          require(${JSON.stringify(meta.component)})
        );
      `);
    }

    if (meta.deps) {
      dependencies = dependencies.concat(
        meta.deps.map(dependency => {
          if (!dependency.code) {
            if (
              supportsBrowserJSON &&
              dependency.startsWith(browserJSONPrefix)
            ) {
              dependency = dependency.slice(browserJSONPrefix.length);
            }
            // external file, just require it
            return `require(${JSON.stringify(dependency)});`;
          } else {
            // inline content, we'll create a virtual dependency.
            const virtualPath = path.resolve(
              path.dirname(this.resourcePath),
              dependency.virtualPath
            );
            const virtualModules = getVirtualModules(this._compiler);
            virtualModules.writeModule(virtualPath, dependency.code);
            return `require(${JSON.stringify(dependency.virtualPath)})`;
          }
        })
      );
    }

    if (dependenciesOnly && meta.tags) {
      // we need to also include the dependencies of
      // any tags that are used by this template
      dependencies = dependencies.concat(
        meta.tags
          .filter(tagPath => tagPath.endsWith(".marko"))
          .map(tagPath => {
            return `require(${JSON.stringify(tagPath + "?dependencies")});`;
          })
      );
    }

    if (!dependenciesOnly) {
      dependencies = dependencies.concat(code);
    }

    return dependencies.join("\n");
  } else {
    const { code, meta } = markoCompiler.compile(source, this.resourcePath, {
      sourceOnly: false,
      writeToDisk: false,
      requireTemplates: true
    });

    getMissingWatchDeps(this.resourcePath, meta).forEach(dep =>
      this.addDependency(dep)
    );

    return code;
  }
}

function getMissingWatchDeps(resource: string, meta: any) {
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


function normalizeTarget(target) {
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
