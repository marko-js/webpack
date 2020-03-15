import * as path from "path";
import moduleName from "../shared/module-name";
import { VIRTUAL_SERVER_MANIFEST_PATH } from "../shared/virtual";

export default (
  resourcePath: string,
  runtimeId: string | undefined,
  publicPath: string | undefined
): string => `
import template from ${JSON.stringify(`./${path.basename(resourcePath)}`)};
import manifest from ${JSON.stringify(
  `./${path.relative(path.dirname(resourcePath), VIRTUAL_SERVER_MANIFEST_PATH)}`
)};

static function renderAssets() {
  const assets = this.___assets;
  const nonce = this.global.cspNonce;
  this.___renderAssets = this.___assets = undefined;
  this.flush = this.___flush;
  this.end = this.___end;

  if (assets) {
    ${
      publicPath === undefined
        ? `__webpack_public_path__ && this.script(\`${
            runtimeId ? `$mwp_${runtimeId}` : "$mwp"
          }=\${JSON.stringify(__webpack_public_path__)}\`);`
        : ""
    }

    if (assets.js) {
      const setNonce = nonce && \`.setAttribute("nonce", \${JSON.stringify(nonce)})\`;
      this.script(
        \`(function(b,h){var e=[],c=0;h.forEach(function(d,f){var a=b.createElement("link");a.relList&&a.relList.supports&&a.relList.supports("preload")?(a.href=d,a.rel="preload",a.as="script",a.addEventListener("load",function(){b.head.removeChild(a);e[f]=d;if(c===f)for(var a;a=e[c];c++){var g=b.createElement("script");g.src=a;\${setNonce ? \`g\${setNonce};\` : ""}b.head.appendChild(g)}}),b.head.appendChild(a)):(a=b.createElement("script"),a.src=d,a.defer=!0,\${setNonce ? \`a\${setNonce},\` : ""}b.head.appendChild(a))})})(document,\${
          JSON.stringify(assets.js.map(js => __webpack_public_path__+js))
        })\`
      );
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

${
  runtimeId === undefined
    ? ""
    : `$ out.global.runtimeId = ${JSON.stringify(runtimeId)};`
}
$ out.___flush = out.flush;
$ out.___end = out.end;
$ out.___renderAssets = renderAssets;
$ out.___assets = manifest.getAssets(${JSON.stringify(
  moduleName(resourcePath)
)}, out.global.buildName);
$ out.flush = outFlushOverride;
$ out.end = outEndOverride;

<\${template} ...input/>
<init-components/>
`;
