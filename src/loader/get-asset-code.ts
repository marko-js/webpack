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
  const entries = this.global.___entries;
  this.global.___entries = undefined;

  if (entries) {
    ${
      !publicPath
        ? `__webpack_public_path__ && this.script(\`${
            runtimeId ? `$mwp_${runtimeId}` : "$mwp"
          }=\${JSON.stringify(__webpack_public_path__)}\`);`
        : ""
    }

    const buildName = this.global.buildName;
    const nonce = this.global.cspNonce;
    const nonceAttr = nonce ? \` nonce=\${JSON.stringify(nonce)}\` : "";
    const written = this.global.___writtenAssets || (this.global.___writtenAssets = new Set());
    let scripts = "";
    let styles = "";

    for (const entry of entries) {
      const assets = manifest.getAssets(entry, buildName);

      if (assets.js) {
        for (const href of assets.js) {
          if (!written.has(href)) {
            written.add(href);
            scripts += \`<script src=\${JSON.stringify(__webpack_public_path__+href)}\${nonceAttr} async></script>\`;
          }
        }
      }

      if (assets.css) {
        for (const href of assets.css) {
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

$ {
  ${
    runtimeId === undefined
      ? ""
      : `out.global.runtimeId = ${JSON.stringify(runtimeId)};`
  }

  out.global.___renderAssets = renderAssets;
  out.global.___entries = (out.global.___entries || []).push(${JSON.stringify(
    moduleName(resourcePath)
  )});
}

<__flush_here_and_after__>
   $ out.global.___renderAssets && out.global.___renderAssets();
</__flush_here_and_after__>
<\${template} ...input/>
<init-components/>
<await-reorderer/>
`;
};
