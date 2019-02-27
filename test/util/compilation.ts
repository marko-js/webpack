import path from "path";
import { promisify } from "util";
import webpack from "webpack";
import MemoryFS from "memory-fs";

export default async function compile(config) {
  const compiler = webpack(extendConfig(config));
  const fs = (compiler.outputFileSystem = new MemoryFS());
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

  return config;
};
