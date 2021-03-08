import path from "path";
import moduleName from "../shared/module-name";

export default (
  resourcePath: string,
  runtimeId: string | undefined,
  publicPath: string | undefined
): string => {
  const templatePath = JSON.stringify(`./${path.basename(resourcePath)}`);
  return `\
import template from ${templatePath};
import manifest from "!!@marko/webpack/loader!?manifest";
export * from ${templatePath};

static function renderAssets() {
  const assets = this.___assets;
  this.___renderAssets = this.___assets = undefined;
  this.flush = this.___flush;
  this.end = this.___end;

  if (assets) {
    ${
      !publicPath
        ? `__webpack_public_path__ && this.script(\`${
            runtimeId ? `$mwp_${runtimeId}` : "$mwp"
          }=\${JSON.stringify(__webpack_public_path__)}\`);`
        : ""
    }

    const nonce = this.global.cspNonce;
    const nonceAttr = nonce ? \` nonce=\${JSON.stringify(nonce)}\` : "";
    const written = this.global.___writtenAssets || (this.global.___writtenAssets = new Set());
    let scripts = "";
    let styles = "";

    for (const curAssets of assets) {
      if (curAssets.js) {
        for (const href of curAssets.js) {
          if (!written.has(href)) {
            written.add(href);
            scripts += \`<script src=\${JSON.stringify(__webpack_public_path__+href)}\${nonceAttr} async></script>\`;
          }
        }
      }

      if (curAssets.css) {
        for (const href of curAssets.css) {
          if (!written.has(href)) {
            written.add(href);
            styles += \`<link rel="stylesheet" href=\${JSON.stringify(__webpack_public_path__+href)}>\`;
          }
        }
      }
    }

    this.write(scripts + styles);
  }
}

static function outFlushOverride() {
  this.___renderAssets();
  this.flush();
}

static function outEndOverride(data, encoding, callback) {
  this.___renderAssets();
  this.end(data, encoding, callback);
}

$ {
  ${
    runtimeId === undefined
      ? ""
      : `out.global.runtimeId = ${JSON.stringify(runtimeId)};`
  }

  const curAssets = out.___assets;
  const newAssets = manifest.getAssets(${JSON.stringify(
    moduleName(resourcePath)
  )}, out.global.buildName);

  if (curAssets) {
    curAssets.push(newAssets);
  } else {
    out.___assets = [newAssets];
    out.___flush = out.flush;
    out.___end = out.end;
    out.___renderAssets = renderAssets;
    out.flush = outFlushOverride;
    out.end = outEndOverride;
  }
}

<\${template} ...input/>
<init-components/>
<await-reorderer/>
`;
};
