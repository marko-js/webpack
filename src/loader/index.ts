import babelLoader from "babel-loader";
import loaderUtils from "loader-utils";
import { encode } from "./interface";
import moduleName from "../shared/module-name";

const assetsPattern = /\?template=(.+)$/;
const codeLoader = require.resolve("./code-loader");
const defaultLoaders = {
  css: "style-loader!css-loader!"
};

export default babelLoader.custom(() => {
  return {
    customOptions({ output, dependencies, ...loader }) {
      const assetsPatternMatch = assetsPattern.exec(this.resourceQuery);
      return {
        custom: {
          output:
            output || normalizeTarget(this.target) === "browser"
              ? "vdom"
              : "html",
          dependenciesOnly:
            dependencies || this.resourceQuery === "?dependencies",
          assetTemplate:
            assetsPatternMatch && decodeURIComponent(assetsPatternMatch[1])
        },
        loader
      };
    },

    config(cfg, { customOptions }) {
      if (cfg.hasFilesystemConfig()) {
        return cfg.options;
      }

      return {
        ...cfg.options,
        plugins: [
          ["babel-plugin-marko", { output: customOptions.output }],
          ...(cfg.options.plugins || [])
        ]
      };
    },

    result(result, { customOptions }) {
      const { assetTemplate, dependenciesOnly } = customOptions;
      let { code } = result;

      if (assetTemplate) {
        code = code
          .replace(
            "TEMPLATE_IMPORT",
            `require(${JSON.stringify(assetTemplate)})`
          )
          .replace(
            "TEMPLATE_MODULE_ID",
            JSON.stringify(moduleName(assetTemplate))
          );
      } else {
        const metadata = result.metadata.marko;

        if (dependenciesOnly) {
          code = "";

          if (metadata.component) {
            code += `require('marko/components').register(${JSON.stringify(
              metadata.id
            )}, require(${JSON.stringify(metadata.component)}));`;
          }
        }

        if (metadata.deps) {
          const module = this.options
            ? this.options.module
            : this._compilation.options.module;
          const loaders = (module && (module.loaders || module.rules)) || [];

          code += metadata.deps
            .map(dependency => {
              if (!dependency.code) {
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
                return `require(${loaderString});`;
              }
            })
            .join("");
        }

        if (dependenciesOnly && metadata.tags) {
          // we need to also include the dependencies of
          // any tags that are used by this template
          code += metadata.tags
            .map(
              tagPath =>
                `require(${JSON.stringify(tagPath + "?dependencies")});`
            )
            .join("");
        }
      }

      return {
        ...result,
        code
      };
    }
  };
});

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
