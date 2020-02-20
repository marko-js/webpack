import path from "path";
import webpack from "webpack";
import MemoryFS from "memory-fs";
import { promisify } from "util";

// We import the loader so that jest can track which tests are related to it (all of them :p).
import "../../loader";

export default async function compile(config: webpack.Configuration) {
  const compiler = webpack(extendConfig(config));
  const outputFS = (compiler.outputFileSystem = new MemoryFS());
  let stats = await promisify(compiler.run.bind(compiler))();

  if (stats.stats) {
    stats = stats.stats;
  } else {
    stats = [stats];
  }

  return { outputFS, stats: stats as webpack.Stats[] };
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
