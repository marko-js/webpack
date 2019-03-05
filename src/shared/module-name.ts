import path from "path";
import baseX from "base-x";
import { createHash } from "crypto";
import { getClientPath as moduleRelativePath } from "lasso-modules-client/transport";

const base62 = baseX("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

export default (filename) => {
  const modulePath = moduleRelativePath(filename);
  const hasher = createHash('sha256');
  hasher.update(modulePath);
  const hash = base62.encode(hasher.digest()).slice(0, 4);
  const baseName = path.basename(filename);
  let name = baseName.slice(0, baseName.indexOf('.'));

  if (name === 'index') {
    name = path.basename(path.dirname(filename));
  }

  return name + '$' + hash;
}