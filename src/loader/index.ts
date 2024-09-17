"use strict";

import path from "path";
import * as webpack from "webpack";
import loaderUtils from "loader-utils";
import escapeRegExp from "escape-string-regexp";
import * as markoCompiler from "@marko/compiler";

import getAssetCode from "./get-asset-code";
import { MANIFEST_PLACEHOLDER } from "../shared/manifest";

type LoaderOptions = loaderUtils.OptionObject &
  markoCompiler.Config & {
    target?: webpack.loader.LoaderContext["target"];
    compiler?: string;
    hydrateIncludeImports?:
      | string
      | markoCompiler.Config["hydrateIncludeImports"];
  };

const WATCH_MISSING_FILES = [
  {
    basename: "style",
    has(meta: markoCompiler.MarkoMeta): boolean {
      return Boolean(
        meta.deps &&
          meta.deps.some(
            (dep: any) =>
              getBasenameWithoutExt(
                (typeof dep === "object" && dep.virtualPath) ||
                  (dep as unknown as string)
              ) === this.basename
          )
      );
    }
  },
  {
    basename: "component",
    has(meta: markoCompiler.MarkoMeta): boolean {
      return Boolean(meta.component);
    }
  },
  {
    basename: "component-browser",
    has(meta: markoCompiler.MarkoMeta): boolean {
      return Boolean(
        meta.component ||
          (meta.deps &&
            meta.deps.some(
              (dep: any) =>
                getBasenameWithoutExt(
                  (typeof dep === "object" && dep.virtualPath) ||
                    (dep as unknown as string)
                ) === this.basename
            ))
      );
    }
  }
];

const ADDED_CACHE_CLEAR = new WeakSet();
markoCompiler.taglib.register(__filename, {
  "<head>": {
    transformer: require.resolve("./head-transformer")
  }
});

export default async function (
  this: webpack.loader.LoaderContext,
  source: string
) {
  const { resourcePath, resourceQuery } = this;
  const compiler = getCompiler(this);
  const loaderOptions: LoaderOptions = (this as any).getOptions
    ? (this as any).getOptions()
    : loaderUtils.getOptions(this);
  const {
    runtimeId,
    markoCompileCache,
    markoVirtualSources
  }: {
    runtimeId?: string;
    markoCompileCache: Map<any, any>;
    markoVirtualSources: Map<string, { code: string; map?: any }>;
  } = (compiler.markoPluginOptions ||= {
    markoCompileCache: new Map(),
    markoVirtualSources: new Map()
  });
  const sourceMaps = loaderOptions.sourceMaps ?? this.sourceMap;
  const target = normalizeTarget(loaderOptions.target || this.target);
  this.cacheable(true);

  if (!ADDED_CACHE_CLEAR.has(compiler)) {
    compiler.hooks.watchRun.tap("clearMarkoTaglibCache", () =>
      markoCompiler.taglib.clearCaches()
    );
    ADDED_CACHE_CLEAR.add(compiler);
  }

  if (resourceQuery === "?manifest") {
    return `export default ${MANIFEST_PLACEHOLDER}`;
  }

  if (markoVirtualSources.has(this.resource)) {
    const { code, map } = markoVirtualSources.get(this.resource);
    return this.callback(null, code, map);
  }

  const done = this.async();

  try {
    const baseConfig: markoCompiler.Config = {
      sourceMaps,
      hot: this.hot,
      fileSystem: this.fs,
      writeVersionComment: false,
      runtimeId,
      cache: markoCompileCache,
      resolveVirtualDependency(resourcePath, { code, map, virtualPath }) {
        const absoluteVirtualPath = `${resourcePath}?virtual=${virtualPath}`;
        markoVirtualSources.set(absoluteVirtualPath, { code, map });
        return `${virtualPath}!=!${__filename}!${absoluteVirtualPath}`;
      },
      babelConfig: {
        babelrc: false,
        configFile: false,
        browserslistConfigFile: false,
        ...loaderOptions.babelConfig,
        compact: false,
        comments: false,
        caller: {
          name: "@marko/webpack/loader",
          target: this.target,
          supportsStaticESM: true,
          supportsDynamicImport: true,
          supportsTopLevelAwait: true,
          ...loaderOptions.babelConfig?.caller
        }
      }
    };

    if (loaderOptions.hydrateIncludeImports) {
      baseConfig.hydrateIncludeImports = loaderOptions.hydrateIncludeImports;
    }

    if (resourceQuery === "?server-entry") {
      const { code, map } = await markoCompiler.compile(
        getAssetCode(
          resourcePath,
          runtimeId,
          compiler.options.output.publicPath
        ),
        resourcePath.replace(/\.marko$/, "-server-entry.marko"),
        baseConfig
      );

      return done(null, code, map as unknown as string);
    }

    if (target === "server") {
      const { code, map, meta } = await markoCompiler.compile(
        source,
        resourcePath,
        baseConfig
      );

      return done(
        null,
        code + getTrailingContent(this, resourcePath, meta),
        map as unknown as string
      );
    }

    if (resourceQuery === "?browser-entry") {
      const { code, meta } = await markoCompiler.compile(source, resourcePath, {
        ...baseConfig,
        sourceMaps: false,
        output: "hydrate"
      });

      const mwpVar = `$mwp${runtimeId ? `_${runtimeId}` : ""}`;
      const mwpPrefix =
        compiler.options.output.publicPath === undefined
          ? `if (window.${mwpVar}) __webpack_public_path__ = ${mwpVar};\n`
          : "";

      return done(
        null,
        mwpPrefix + code + getTrailingContent(this, resourcePath, meta)
      );
    }

    const { code, meta, map } = await markoCompiler.compile(
      source,
      resourcePath,
      {
        ...baseConfig,
        output: "dom"
      }
    );

    return done(
      null,
      code + getTrailingContent(this, resourcePath, meta),
      map as unknown as string
    );
  } catch (err) {
    done(err);
  }
}

function getTrailingContent(
  ctx: webpack.loader.LoaderContext,
  resource: string,
  meta: markoCompiler.MarkoMeta
) {
  let result = "";

  if (meta.watchFiles) {
    for (const watchFile of meta.watchFiles) {
      ctx.addDependency(watchFile);
    }
  }

  if (ctx._compiler.watchMode) {
    const missingDeps = [];
    for (const watchFile of WATCH_MISSING_FILES) {
      if (!watchFile.has(meta)) {
        missingDeps.push(watchFile.basename);
      }
    }

    if (missingDeps.length) {
      const templateFileName = getBasenameWithoutExt(resource);
      result += `\nrequire.context(".", false, /\\/${
        templateFileName === "index"
          ? ""
          : `${escapeRegExp(templateFileName)}\\.`
      }(?:${missingDeps.join("|")})\\.[^d]\\w*$/)`;
    }
  }

  if (ctx.hot && ctx.resourceQuery !== "?browser-entry") {
    result += "\nif (import.meta.webpackHot) import.meta.webpackHot.accept()";
  }

  return result;
}

function getCompiler(ctx: webpack.loader.LoaderContext) {
  let compiler = ctx._compiler;
  if ((compiler as any).root) return (compiler as any).root;

  while ((compiler as any).parentCompilation) {
    compiler = (compiler as any).parentCompilation.compiler;
  }

  return compiler;
}

function getBasenameWithoutExt(file: string): string {
  const baseStart = file.lastIndexOf(path.sep) + 1;
  const extStart = file.indexOf(".", baseStart + 1);
  return file.slice(baseStart, extStart);
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
