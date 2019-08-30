"use strict";

import * as path from "path";
import * as loaderUtils from "loader-utils";
import { encode } from "./interface";
import getAssetCode from "./get-asset-code";

const defaultLoaders = {
  css: "style-loader!css-loader!"
};

const codeLoader = require.resolve("./code-loader");
const isHydrate = /\?hydrate$/;
const isDependencies = /\?dependencies$/;
const isAssets = /\?assets$/;

const DEFAULT_COMPILER = require.resolve("marko/compiler");
const cacheClearSetup = new WeakMap();
const browserJSONPrefix = "package: ";
let supportsBrowserJSON: boolean;

export default function(source) {
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
        delete window.$mwp;
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
            // inline content, we'll create a
            const virtualPath = dependency.virtualPath;
            const loader = getLoaderMatch(virtualPath, loaders);
            const codeQuery = encode(dependency.code);
            const loaderString = loaderUtils.stringifyRequest(
              this,
              `!!${loader}${codeLoader}?${codeQuery}!${this.resourcePath}`
            );
            return `require(${loaderString})`;
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
    return markoCompiler.compile(source, this.resourcePath, {
      writeToDisk: false,
      requireTemplates: true
    });
  }
}

function getLoaderMatch(loaderPath, loaders) {
  let loaderString;
  let ext;

  loaders.some(loader => {
    if (loader.test.test(loaderPath)) {
      loaderString = getLoaderString(loader.use || loader.loader);
      return true;
    }
  });

  if (!loaderString) {
    ext = loaderPath.slice(loaderPath.lastIndexOf(".") + 1);
    loaderString = getLoaderString(defaultLoaders[ext]);
  }

  return loaderString;
}

function getLoaderString(loader) {
  if (!loader) {
    return "";
  } else if (typeof loader === "string") {
    return loader.slice(-1) === "!" ? loader : loader + "!";
  } else if (Array.isArray(loader)) {
    return loader.map(getLoaderString).join("");
  } else {
    const options = loader.options;
    const optionsString =
      options &&
      (typeof options === "string" ? options : JSON.stringify(options));
    return loader.loader + (optionsString ? "?" + optionsString : "") + "!";
  }
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
