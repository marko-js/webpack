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
  }
];

const DEFAULT_COMPILER = require.resolve("@marko/compiler");
const ADDED_CACHE_CLEAR = new WeakSet();
const ADDED_CUSTOM_TAGLIB = new WeakSet();
const BROWSER_JSON_PREFIX = "package: ";

export default async function (
  this: webpack.loader.LoaderContext,
  source: string
) {
  const { resourcePath, resourceQuery } = this;
  const compiler = getCompiler(this);
  const loaderOptions: LoaderOptions = loaderUtils.getOptions(this);
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

  if (resourceQuery === "?browser-entry") {
    const mwpVar = `$mwp${
      pluginOptions.runtimeId ? `_${pluginOptions.runtimeId}` : ""
    }`;
    return `${
      compiler.options.output.publicPath === undefined
        ? `if (window.${mwpVar}) __webpack_public_path__ = ${mwpVar};\n`
        : ""
    }${importStr(`./${path.basename(resourcePath)}?hydrate`)};\n${
      pluginOptions.runtimeId
        ? `${importStr("marko/components", "{ init }")};\ninit(${JSON.stringify(
            pluginOptions.runtimeId
          )});`
        : "window.$initComponents && $initComponents();"
    }\n`;
  }

  if (virtualSources.has(this.resource)) {
    const { code, map } = virtualSources.get(this.resource);
    virtualSources.delete(this.resource);
    return this.callback(null, code, map as string);
  }

  const done = this.async();
  const baseConfig = {
    sourceMaps,
    fileSystem: this.fs,
    writeVersionComment: false,
    cache: (compiler.markoCompileCache ||= new Map()),
    babelConfig: {
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

  if (resourceQuery === "?server-entry") {
    const { code, map } = await markoCompiler.compile(
      getAssetCode(
        resourcePath,
        pluginOptions.runtimeId,
        compiler.options.output.publicPath
      ),
      resourcePath,
      baseConfig
    );

    return done(null, code, map as string);
  }

  if (target === "server") {
    const { code, map, meta } = await markoCompiler.compile(
      source,
      resourcePath,
      baseConfig
    );

    return done(
      null,
      code + referenceMissingDeps(this, resourcePath, meta),
      map as string
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

  const deps = [];
  const basePath = `./${path.basename(resourcePath)}`;

  if (meta.deps) {
    for (let dep of meta.deps) {
      if (typeof dep === "string") {
        if (dep.startsWith(BROWSER_JSON_PREFIX)) {
          if (compiler.options.resolve?.extensions?.includes(".browser.json")) {
            dep = dep.slice(BROWSER_JSON_PREFIX.length);
          } else {
            continue; // Do not load browser.json deps by default.
          }
        }

        // external file, just require it.
        deps.push(importStr(dep));
      } else {
        // inline content, we'll create a virtual dependency.
        const virtualPath = `${resourcePath}?virtual=${dep.virtualPath}`;
        virtualSources.set(virtualPath, { code: dep.code });
        deps.push(
          importStr(`${dep.virtualPath}!=!${__filename}!${virtualPath}`)
        );
      }
    }
  }

  if (resourceQuery === "?hydrate") {
    const hydrateDeps = [];
    let isStateless = true;

    if (deps.length) {
      virtualSources.set(`${resourcePath}?deps`, { code: deps.join("\n") });
      hydrateDeps.push(importStr(`${basePath}?deps`));
    }

    if (meta.component) {
      if (path.extname(meta.component) === ".marko") {
        // Load code for stateful components.
        isStateless = false;
        virtualSources.set(`${resourcePath}?code`, { code, map });
        hydrateDeps.push(importStr(`${basePath}?code`));
      } else {
        hydrateDeps.push(
          importStr("marko/components", "{ register }"),
          importStr(meta.component, "component"),
          `register(${JSON.stringify(meta.id)}, component)`
        );
      }
    }

    if (isStateless) {
      // Register a split component.
      if (meta.tags) {
        // we need to also include the hydrate of
        // any tags that are used by this template
        for (const tagPath of meta.tags) {
          if (tagPath.endsWith(".marko")) {
            hydrateDeps.push(importStr(`${tagPath}?hydrate`));
          }
        }
      }
    }

    return done(null, hydrateDeps.join("\n"));
  }

  const missingDeps = referenceMissingDeps(this, resourcePath, meta);
  const hasDeps = deps.length;

  if (hasDeps || missingDeps) {
    let codeWithDeps = exportStr(`${basePath}?code`);
    virtualSources.set(`${resourcePath}?code`, { code, map });

    if (hasDeps) {
      virtualSources.set(`${resourcePath}?deps`, { code: deps.join("\n") });
      codeWithDeps = `${importStr(`${basePath}?deps`)}\n${codeWithDeps}`;
    }

    if (missingDeps) {
      codeWithDeps += `\n${missingDeps}`;
    }

    return done(null, codeWithDeps);
  }

  return done(null, code, map as string);
}

function referenceMissingDeps(
  ctx: webpack.loader.LoaderContext,
  resource: string,
  meta: MarkoMeta
) {
  if (meta.watchFiles) {
    for (const watchFile of meta.watchFiles) {
      ctx.addDependency(watchFile);
    }
  }

  if (!ctx._compiler.watchMode) {
    return "";
  }

  const missingDeps = [];
  for (const watchFile of WATCH_MISSING_FILES) {
    if (!watchFile.has(meta)) {
      missingDeps.push(watchFile.basename);
    }
  }

  if (missingDeps.length) {
    const templateFileName = getBasenameWithoutExt(resource);
    return `require.context(".", false, /\\${path.sep}${
      templateFileName === "index" ? "" : `${escapeRegExp(templateFileName)}\\.`
    }(?:${missingDeps.join("|")})\\.[^\\${path.sep}]+$/)`;
  }

  return "";
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

function importStr(request: string, lhs?: string) {
  const id = JSON.stringify(request);

  if (lhs) {
    return `import ${lhs} from ${id}`;
  }

  return `import ${id}`;
}

function exportStr(request: string) {
  const id = JSON.stringify(request);
  // You must `default`, it is not included with `export *`...
  return `export { default } from ${id};\nexport * from ${id}`;
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
