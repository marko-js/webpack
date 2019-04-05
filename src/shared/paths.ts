import path from "path";

const CWD = process.cwd();

export const VIRTUAL_BROWSER_INVALIDATE_PATH = path.join(
  CWD,
  "__MARKO_WEBPACK_INVALIDATE__.js"
);

export const VIRTUAL_SERVER_MANIFEST_PATH = path.join(
  CWD,
  "__MARKO_WEBPACK__MANIFEST.js"
);
