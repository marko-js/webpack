import path from "path";
import webpack from "webpack";
import MemoryFS from "memory-fs";
import { promisify } from "util";

export default async function compile(
  w: typeof webpack,
  config: webpack.Configuration
) {
  const compiler = w(extendConfig(config));
  const outputFS = (compiler.outputFileSystem = new MemoryFS()) as typeof import("fs");
  let stats = await promisify(compiler.run.bind(compiler))();

  if (stats.stats) {
    stats = stats.stats;
  } else {
    stats = [stats];
  }

  return {
    outputFS,
    stats: stats as webpack.Stats[],
    outputPath: compiler.outputPath
  };
}

function extendConfig(config: webpack.Configuration) {
  if (Array.isArray(config)) {
    return config.map(extendConfig);
  }

  const resolveLoader = (config.resolveLoader = config.resolveLoader || {});
  const resolveLoaderAlias = (resolveLoader.alias = resolveLoader.alias || {});
  resolveLoaderAlias["@marko/webpack/loader"] = path.resolve(
    __dirname,
    "../../loader/index.ts"
  );

  // By default we'll use dev mode so that sources are more readable
  // but we'll disable sourcemaps unless the test has specifically opted in
  config.mode = config.mode || "development";
  config.devtool = config.devtool || false;
  config.externals = [/^[^./!]/]; // excludes node_modules

  return config;
}
