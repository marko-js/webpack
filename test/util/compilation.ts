import path from "path";
import { promisify } from "util";
import webpack from "webpack";
import MemoryFS from "memory-fs";

export default async function compile(config) {
  const compiler = webpack(extendConfig(config));
  const fs = ((compiler as any).outputFileSystem = new MemoryFS());
  const stats = await promisify(compiler.run).call(compiler);
  return { fs, stats };
}

const extendConfig = config => {
  if (Array.isArray(config)) {
    return config.map(extendConfig);
  }

  const resolveLoader = (config.resolveLoader = config.resolveLoader || {});
  const resolveLoaderAlias = (resolveLoader.alias = resolveLoader.alias || {});
  resolveLoaderAlias["@marko/webpack/loader"] = path.resolve(
    __dirname,
    "../../src/loader/index.ts"
  );

  // By default we'll use dev mode so that sources are more readable
  // but we'll disable sourcemaps unless the test has specifically opted in
  config.mode = config.mode || 'development';
  config.devtool = config.devtool || 'none';

  return config;
};
