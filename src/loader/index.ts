"use strict";

import * as path from "path";
import { Compiler } from "webpack";
import * as loaderUtils from "loader-utils";
import ConcatMap from "concat-with-sourcemaps";
import escapeRegExp from "escape-string-regexp";
import getAssetCode from "./get-asset-code";
import { getVirtualModules } from "../shared/virtual";
import pluginOptionsForCompiler from "../shared/plugin-options-for-compiler";

const WATCH_MISSING_FILES = [
  {
    basename: "style",
    has(meta): boolean {
      return Boolean(
        meta.deps &&
          meta.deps.some(
            dep =>
              getBasenameWithoutExt(dep.virtualPath || dep) === this.basename
          )
      );
    }
  },
  {
    basename: "component",
    has(meta): boolean {
      return Boolean(meta.component);
    }
  },
  {
    basename: "component-browser",
    has(meta): boolean {
      return Boolean(
        meta.component ||
          (meta.deps &&
            meta.deps.some(
              dep =>
                getBasenameWithoutExt(dep.virtualPath || dep) === this.basename
            ))
      );
    }
  }
];

const DEFAULT_COMPILER = require.resolve("marko/compiler");
const COMPILATION_CACHE = new WeakMap();
const ADDED_CACHE_CLEAR = new WeakSet();
const BROWSER_JSON_PREFIX = "package: ";
let SUPPORTS_BROWSER_JSON: boolean;

export default function(source: string): void | string | Buffer {
  const compiler = this._compiler as Compiler;
  let compiledCache = COMPILATION_CACHE.get(this._compilation);

  if (!compiledCache) {
    compiledCache = new Map();
    COMPILATION_CACHE.set(this._compilation, compiledCache);
  }

  if (SUPPORTS_BROWSER_JSON === undefined) {
    const resolveOptions = compiler.options.resolve;
    const compilerExtensions =
      (resolveOptions && resolveOptions.extensions) || [];
    SUPPORTS_BROWSER_JSON = compilerExtensions.includes(".browser.json");
  }

  const pluginOptions = pluginOptionsForCompiler.get(compiler);
  const queryOptions = loaderUtils.getOptions(this); // Not the same as this.options
  const target = normalizeTarget(
    (queryOptions && queryOptions.target) || this.target
  );
  const publicPath = compiler.options.output.publicPath;
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

  const hydrate = this.resourceQuery.endsWith("?hydrate");
  const assets = this.resourceQuery.endsWith("?assets");
  let sourceMaps =
    !queryOptions || queryOptions.sourceMaps === undefined
      ? this.sourceMap
      : queryOptions.sourceMaps;

  if (sourceMaps === "inline") {
    sourceMaps = true;
  }

  if (!ADDED_CACHE_CLEAR.has(this._compiler)) {
    this._compiler.hooks.watchRun.tap("clearMarkoTaglibCache", () => {
      markoCompiler.clearCaches();
    });
    ADDED_CACHE_CLEAR.add(this._compiler);
  }

  let dependencies: string[];
  let code: string | Buffer;
  let map;
  let meta;

  if (assets) {
    ({ code, map, meta } = markoCompiler.compile(
      getAssetCode(this.resourcePath, runtimeId, publicPath),
      this.resourcePath,
      {
        sourceOnly: false,
        writeToDisk: false,
        requireTemplates: true,
        writeVersionComment: false,
        fileSystem: this.fs,
        babelConfig
      }
    ));
  } else if (hydrate) {
    const mwpVar = `$mwp${runtimeId ? `_${runtimeId}` : ""}`;
    code = `${
      publicPath === undefined
        ? `if (window.${mwpVar}) __webpack_public_path__ = ${mwpVar};\n`
        : ""
    }${loadStr(`./${path.basename(this.resourcePath)}?dependencies`)};\n${
      runtimeId
        ? `${loadStr("marko/components", "{ init }")};\ninit(${JSON.stringify(
            runtimeId
          )});`
        : "window.$initComponents && $initComponents();"
    }\n`;
  } else if (target !== "server" && markoCompiler.compileForBrowser) {
    const dependenciesOnly = this.resourceQuery.endsWith("?dependencies");
    dependencies = [];

    ({ code, meta, map } = getAndCache(compiledCache, this.resourcePath, () =>
      markoCompiler.compileForBrowser(source, this.resourcePath, {
        sourceOnly: false,
        writeToDisk: false,
        writeVersionComment: false,
        fileSystem: this.fs,
        sourceMaps,
        babelConfig
      })
    ));

    if (
      dependenciesOnly &&
      meta.component &&
      path.extname(this.resourcePath) === path.extname(meta.component)
    ) {
      // Normal stateful component, just load it directly even in dependencies only mode.
      return loadStr(meta.component);
    }

    if (meta.deps) {
      for (let dep of meta.deps) {
        if (!dep.code) {
          if (dep.startsWith(BROWSER_JSON_PREFIX)) {
            if (SUPPORTS_BROWSER_JSON) {
              dep = dep.slice(BROWSER_JSON_PREFIX.length);
            } else {
              continue; // Do not load browser.json dependencies by default.
            }
          }

          // external file, just require it
          dependencies.push(loadStr(dep));
        } else {
          // inline content, we'll create a virtual dependency.
          const virtualPath = path.resolve(
            path.dirname(this.resourcePath),
            dep.virtualPath
          );

          // We don't want to hit the disk, but instead check if the viritual file was already written.
          const existingContent =
            this.fs._readFileStorage &&
            this.fs._readFileStorage.data.get(virtualPath);

          if (!existingContent || existingContent[1] !== dep.code) {
            getVirtualModules(this._compiler).writeModule(
              virtualPath,
              dep.code
            );
          }

          dependencies.push(loadStr(dep.virtualPath));
        }
      }
    }

    if (dependenciesOnly) {
      code = "";
      map = undefined;

      if (meta.component) {
        // Register a split component.
        dependencies.push(
          loadStr("marko/components", "{ register }"),
          loadStr(meta.component, "component"),
          `register(${JSON.stringify(meta.id)}, component)`
        );
      }

      if (meta.tags) {
        // we need to also include the dependencies of
        // any tags that are used by this template
        for (const tagPath of meta.tags) {
          if (tagPath.endsWith(".marko")) {
            dependencies.push(loadStr(`${tagPath}?dependencies`));
          }
        }
      }
    }
  } else {
    ({ code, map, meta } = getAndCache(compiledCache, this.resourcePath, () =>
      markoCompiler.compile(source, this.resourcePath, {
        sourceOnly: false,
        writeToDisk: false,
        requireTemplates: true,
        writeVersionComment: false,
        fileSystem: this.fs,
        sourceMaps,
        babelConfig
      })
    ));
  }

  if (meta) {
    if ((compiler as any).watchMode) {
      const missingWatchDep = getMissingDepRequire(this.resourcePath, meta);

      if (missingWatchDep) {
        if (dependencies) {
          dependencies.push(missingWatchDep);
        } else {
          dependencies = [missingWatchDep];
        }
      }

      if (meta.watchFiles) {
        meta.watchFiles.forEach((dep: string) => this.addDependency(dep));
      }
    }
  }

  if (dependencies && dependencies.length) {
    if (code) {
      if (map) {
        const concat = new ConcatMap(true, "", "\n");
        concat.add(null, dependencies.join(";\n"));
        concat.add(this.resourcePath, code, map);
        map = concat.sourceMap;
        code = concat.content;
      } else {
        dependencies.push(code as string);
        code = dependencies.join(";\n");
      }
    } else {
      code = dependencies.join(";\n");
      map = undefined;
    }
  }

  if (map) {
    this.callback(null, code, map);
  } else {
    return code;
  }
}

function getMissingDepRequire(resource: string, meta): string | false {
  const missingDeps = [];
  for (const watchFile of WATCH_MISSING_FILES) {
    if (!watchFile.has(meta)) {
      missingDeps.push(watchFile.basename);
    }
  }

  if (missingDeps.length) {
    const templateFileName = getBasenameWithoutExt(resource);
    return `require.context(".", false, /\\/${
      templateFileName === "index" ? "" : `${escapeRegExp(templateFileName)}\\.`
    }(?:${missingDeps.join("|")})\\.[^d]\\w*$/)`;
  }

  return false;
}

function getAndCache<T extends Map<unknown, unknown>, F extends () => unknown>(
  cache: T,
  cacheKey: string,
  get: F
) {
  let cached = cache.get(cacheKey);

  if (!cached) {
    cache.set(cacheKey, (cached = get()));
  }

  return cached as ReturnType<F>;
}

function getBasenameWithoutExt(file: string): string {
  const baseStart = file.lastIndexOf(path.sep) + 1;
  const extStart = file.indexOf(".", baseStart + 1);
  return file.slice(baseStart, extStart);
}

function isMarko4Compiler(compiler) {
  return Boolean(compiler.builder);
}

function importStr(request: string, lhs?: string) {
  const id = JSON.stringify(request);

  if (lhs) {
    return `import ${lhs} from ${id}`;
  }

  return `import ${id}`;
}

function requireStr(request: string, lhs?: string) {
  const id = JSON.stringify(request);

  if (lhs) {
    return `const ${lhs} = require(${id})`;
  }

  return `require(${id})`;
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
