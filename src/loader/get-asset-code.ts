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

// Check if public path is relative, if not we'll set the crossorigin attribute on scripts.
static const crossOriginAttr = new URL(__webpack_public_path__, "file:").protocol === "file:" ? "" : " crossorigin";
static function renderAssets(out) {
  const $global = out.global;
  const entries = $global.___entries;
  $global.___entries = undefined;

  if (entries) {
    ${
      !publicPath
        ? `__webpack_public_path__ && out.script(\`${
            runtimeId ? `$mwp_${runtimeId}` : "$mwp"
          }=\${JSON.stringify(__webpack_public_path__)}\`);`
        : ""
    }

    const buildName = $global.buildName;
    const nonce = $global.cspNonce;
    const nonceAttr = nonce ? \` nonce=\${JSON.stringify(nonce)}\` : "";
    const written = $global.___writtenAssets || ($global.___writtenAssets = new Set());
    let scripts = "";
    let styles = "";

    for (const entry of entries) {
      const assets = manifest.getAssets(entry, buildName);

      if (assets.js) {
        for (const href of assets.js) {
          if (!written.has(href)) {
            written.add(href);
            scripts += \`<script src=\${JSON.stringify(__webpack_public_path__+href)}\${nonceAttr + crossOriginAttr} async></script>\`;
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

    out.write(scripts + styles);
  }
}

$ {
  ${
    runtimeId === undefined
      ? ""
      : `out.global.runtimeId = ${JSON.stringify(runtimeId)};`
  }

  out.global.___renderAssets = renderAssets;
  (out.global.___entries || (out.global.___entries = [])).push(${JSON.stringify(
    moduleName(resourcePath)
  )});
}

<__flush_here_and_after__>
   $ const outAlias = out; // prevent compat layer from turning this into a dynamic tag
   $ outAlias.global.___renderAssets && outAlias.global.___renderAssets(outAlias);
</__flush_here_and_after__>
<\${template} ...input/>
<init-components/>
<await-reorderer/>
`;
};
