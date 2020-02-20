import * as path from "path";
import moduleName from "../shared/module-name";
import { VIRTUAL_SERVER_MANIFEST_PATH } from "../shared/virtual";

export default (resourcePath: string): string => `
import template from ${JSON.stringify(`./${path.basename(resourcePath)}`)};
import { getBundleName, entries } from ${JSON.stringify(
  `./${path.relative(path.dirname(resourcePath), VIRTUAL_SERVER_MANIFEST_PATH)}`
)};

static function renderAssets() {
  const assets = this.___assets;
  this.___renderAssets = this.___assets = undefined;
  this.flush = this.___flush;
  this.end = this.___end;

  if (assets) {
    this.write(\`<script>window.$mwp=\${JSON.stringify(__webpack_public_path__)}\`)

    if (assets.js) {
      this.write(
        \`;(function(b,h){var e=[],c=0;h.forEach(function(d,f){var a=b.createElement("link");a.relList&&a.relList.supports&&a.relList.supports("preload")?(a.href=d,a.rel="preload",a.as="script",a.addEventListener("load",function(){e[f]=d;if(c===f)for(var a;a=e[c];c++){var g=b.createElement("script");g.src=a;b.head.appendChild(g)}}),b.head.appendChild(a)):(a=b.createElement("script"),a.src=d,a.defer=!0,b.head.appendChild(a))})})(document,\${
          JSON.stringify(assets.js.map(js => __webpack_public_path__+js))
        })\`
      );
    }

    this.write("</script>")

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

$ out.___flush = out.flush;
$ out.___end = out.end;
$ out.___renderAssets = renderAssets;
$ out.___assets = entries[${JSON.stringify(
  moduleName(resourcePath)
)}][getBundleName(out.global)];
$ out.flush = outFlushOverride;
$ out.end = outEndOverride;

<\${template} ...input/>
<init-components/>
`;
