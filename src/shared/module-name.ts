import path from "path";
import { createHash } from "crypto";

const CWD = process.cwd();

export default (filename: string) => {
  const lastSepIndex = filename.lastIndexOf(path.sep);
  let name = filename.slice(
    lastSepIndex + 1,
    filename.indexOf(".", lastSepIndex)
  );

  if (name === "index" || name === "template") {
    name = filename.slice(
      filename.lastIndexOf(path.sep, lastSepIndex - 1) + 1,
      lastSepIndex
    );
  }

  return `${name}_${createHash("MD5")
    .update(path.relative(CWD, filename))
    .digest("base64")
    .replace(/[/+]/g, "-")
    .slice(0, 4)}`;
};
