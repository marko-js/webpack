"use strict";

import path from "path";
import * as webpack from "webpack";
import loaderUtils from "loader-utils";
import escapeRegExp from "escape-string-regexp";
import type { MarkoMeta, Config } from "@marko/compiler";

import getAssetCode from "./get-asset-code";
import { MANIFEST_PLACEHOLDER } from "../shared/manifest";

declare module "webpack" {
  interface Compiler {
    markoCompileCache?: Map<unknown, unknown>;
    markoVirtualSources?: Map<string, { code: string | Buffer; map?: unknown }>;
  }
}

type LoaderOptions = loaderUtils.OptionObject &
  Config & {
    target?: webpack.loader.LoaderContext["target"];
    compiler?: string;
    hydrateIncludeImports?: string | Config["hydrateIncludeImports"];
  };

const WATCH_MISSING_FILES = [
  {
    basename: "style",
    has(meta: MarkoMeta): boolean {
      return Boolean(
        meta.deps &&
          meta.deps.some(
            dep =>
              getBasenameWithoutExt(
                (typeof dep === "object" && dep.virtualPath) ||
                  ((dep as unknown) as string)
              ) === this.basename
          )
      );
    }
  },
  {
    basename: "component",
    has(meta: MarkoMeta): boolean {
      return Boolean(meta.component);
    }
  },
  {
    basename: "component-browser",
    has(meta: MarkoMeta): boolean {
      return Boolean(
        meta.component ||
          (meta.deps &&
            meta.deps.some(
              dep =>
                getBasenameWithoutExt(
                  (typeof dep === "object" && dep.virtualPath) ||
                    ((dep as unknown) as string)
                ) === this.basename
            ))
      );
    }
  }
];

const DEFAULT_COMPILER = require.resolve("@marko/compiler");
const ADDED_CACHE_CLEAR = new WeakSet();
const ADDED_CUSTOM_TAGLIB = new WeakSet();

export default async function (
  this: webpack.loader.LoaderContext,
  source: string
) {
  const { resourcePath, resourceQuery } = this;
  const compiler = getCompiler(this);
  const loaderOptions: LoaderOptions = (this as any).getOptions
    ? (this as any).getOptions()
    : loaderUtils.getOptions(this);
  const pluginOptions = compiler.markoPluginOptions || {};
  const sourceMaps = loaderOptions.sourceMaps ?? this.sourceMap;
  const target = normalizeTarget(loaderOptions.target || this.target);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const markoCompiler = require(loaderOptions.compiler ||
    DEFAULT_COMPILER) as typeof import("@marko/compiler");
  const virtualSources = (compiler.markoVirtualSources ||= new Map());

  this.cacheable(true);

  if (!ADDED_CACHE_CLEAR.has(compiler)) {
    compiler.hooks.watchRun.tap("clearMarkoTaglibCache", () =>
      markoCompiler.taglib.clearCaches()
    );
    ADDED_CACHE_CLEAR.add(compiler);
  }

  if (!ADDED_CUSTOM_TAGLIB.has(markoCompiler)) {
    markoCompiler.taglib.register(__filename, {
      "<head>": {
        transformer: require.resolve("./head-transformer")
      }
    });
    ADDED_CUSTOM_TAGLIB.add(markoCompiler);
  }

  if (resourceQuery === "?manifest") {
    return `export default ${MANIFEST_PLACEHOLDER}`;
  }

  if (virtualSources.has(this.resource)) {
    const { code, map } = virtualSources.get(this.resource);
    return this.callback(null, code, map);
  }

  const done = this.async();

  try {
    const baseConfig = {
      sourceMaps,
      hot: this.hot,
      fileSystem: this.fs,
      writeVersionComment: false,
      runtimeId: pluginOptions.runtimeId,
      cache: (compiler.markoCompileCache ||= new Map()),
      resolveVirtualDependency(resourcePath, { code, map, virtualPath }) {
        const absoluteVirtualPath = `${resourcePath}?virtual=${virtualPath}`;
        virtualSources.set(absoluteVirtualPath, { code, map });
        return `${virtualPath}!=!${__filename}!${absoluteVirtualPath}`;
      },
      babelConfig: {
        ...loaderOptions.babelConfig,
        sourceFileName: resourcePath, // Webpack needs absolute file paths in the output sources and does not honor "sourceRoot".
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
    } as Config;

    if (loaderOptions.hydrateIncludeImports) {
      baseConfig.hydrateIncludeImports = loaderOptions.hydrateIncludeImports;
    }

    if (resourceQuery === "?server-entry") {
      const { code, map } = await markoCompiler.compile(
        getAssetCode(
          resourcePath,
          pluginOptions.runtimeId,
          compiler.options.output.publicPath
        ),
        resourcePath.replace(/\.marko$/, "-server-entry.marko"),
        baseConfig
      );

      return done(null, code, (map as unknown) as string);
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
        (map as unknown) as string
      );
    }

    if (resourceQuery === "?browser-entry") {
      const { code, meta } = await markoCompiler.compile(source, resourcePath, {
        ...baseConfig,
        sourceMaps: false,
        output: "hydrate"
      });

      const mwpVar = `$mwp${
        pluginOptions.runtimeId ? `_${pluginOptions.runtimeId}` : ""
      }`;
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
      (map as unknown) as string
    );
  } catch (err) {
    done(err);
  }
}

function getTrailingContent(
  ctx: webpack.loader.LoaderContext,
  resource: string,
  meta: MarkoMeta
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
