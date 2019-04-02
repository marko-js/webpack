import * as path from "path";
import moduleName from "../shared/module-name";

export default resourcePath => `
import { writeInitComponentsCode } from "marko/components";
import template from ${JSON.stringify(`./${path.basename(resourcePath)}`)};

static const assets = __ASSETS_MANIFEST__[${JSON.stringify(
  moduleName(resourcePath)
)}];
static const renderAssets = function(out) {
  if (!out.global.assetsRendered) {
    const target = out.stream || out;
    if (assets) {
      if (assets.js) {
        target.write(
          \`<script>(function(b,g){var d=[],e=0;g.forEach(function(c,f){var a=b.createElement("link");a.relList&&a.relList.supports&&a.relList.supports("preload")?(a.href=c,a.rel="preload",a.as="script",a.addEventListener("load",function(){d[f]=1;if(e===f)for(;d[e++];){var a=b.createElement("script");a.src=c;b.head.appendChild(a)}}),b.head.appendChild(a)):(a=b.createElement("script"),a.src=c,a.defer=!0,b.head.appendChild(a))})})(document,\${
            JSON.stringify(assets.js.map(js => __webpack_public_path__+js))
          });</script>\`
        );
      }
      if (assets.css) {
        assets.css.forEach(css => {
          target.write(
            \`<link rel="stylesheet" href=\${JSON.stringify(__webpack_public_path__+css)}>\`
          );
        });
      }
    }
    out.global.assetsRendered = true;
  }
}

$ const _flush = out.flush;
$ const _end = out.end;
$ out.flush = function () {
  writeInitComponentsCode(out, out, false);
  renderAssets(out);
  _flush.apply(this, arguments);
}
$ out.end = function () {
  renderAssets(out);
  _end.apply(this, arguments);
}

<\${template} ...input/>
<init-components/>
`;
