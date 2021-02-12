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
  const nonce = this.global.cspNonce;
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

    if (assets.js) {
      const nonceAttr = nonce ? \` nonce=\${JSON.stringify(nonce)}\` : "";
      assets.js.forEach(js => {
        this.write(
          \`<script src=\${JSON.stringify(__webpack_public_path__+js)}\${nonceAttr} async></script>\`
        );
      });
    }

    if (assets.css) {
      assets.css.forEach(css => {
        this.write(
          \`<link rel="stylesheet" href=\${JSON.stringify(__webpack_public_path__+css)}>\`
        );
      });
    }
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
    if (newAssets.js) {
      if (curAssets.js) {
        for (const js of newAssets.js) {
          if (!curAssets.js.includes(js)) {
            curAssets.js.push(js);
          }
        }
      } else {
        curAssets.js = newAssets.js;
      }
    }

    if (newAssets.css) {
      if (curAssets.css) {
        for (const css of newAssets.css) {
          if (!curAssets.css.includes(css)) {
            curAssets.css.push(css);
          }
        }
      } else {
        curAssets.css = newAssets.css;
      }
    }
  } else {
    out.___flush = out.flush;
    out.___end = out.end;
    out.___renderAssets = renderAssets;
    out.___assets = newAssets;
    out.flush = outFlushOverride;
    out.end = outEndOverride;
  }
}

<\${template} ...input/>
<init-components/>
<await-reorderer/>
`;
};
