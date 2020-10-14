/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./__MARKO_WEBPACK__MANIFEST.js":
/*!**************************************!*\
  !*** ./__MARKO_WEBPACK__MANIFEST.js ***!
  \**************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = {
  getAssets(entry) {
    return this.build[entry];
  },
  build: {"test_nzzJ":{"css":["test_nzzJ.css"],"js":["test_nzzJ.js"]}}
}

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin/components/nested/index.marko":
/*!******************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin/components/nested/index.marko ***!
  \******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:21-35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var marko_template = module.exports = __webpack_require__(/*! marko/dist/html */ "marko/dist/html").t(__filename),
    marko_component = {
        onCreate: function() {}
      },
    marko_componentType = "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/components/nested/index.marko",
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div></div>");
}

marko_template._ = marko_renderer(render, {
    e_: marko_componentType
  }, marko_component);

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/components/nested/index.marko",
    component: "./index.marko"
  };


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin/test.marko":
/*!***********************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin/test.marko ***!
  \***********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:21-35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var marko_template = module.exports = __webpack_require__(/*! marko/dist/html */ "marko/dist/html").t(__filename),
    marko_componentType = "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/test.marko",
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer"),
    nested_template = __webpack_require__(/*! ./components/nested/index.marko */ "./src/__tests__/fixtures/with-class-component-plugin/components/nested/index.marko"),
    marko_loadTag = __webpack_require__(/*! marko/dist/runtime/helpers/load-tag */ "marko/dist/runtime/helpers/load-tag"),
    nested_tag = marko_loadTag(nested_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<h1>Hello World</h1>");

  nested_tag({}, out, __component, "1");
}

marko_template._ = marko_renderer(render, {
    d_: true,
    e_: marko_componentType
  });

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "h1 { color:red; }",
          virtualPath: "./test.marko.css",
          path: "./test.marko"
        }
    ],
    id: "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/test.marko",
    tags: [
      "./components/nested/index.marko"
    ]
  };


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin/test.marko?assets":
/*!******************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin/test.marko?assets ***!
  \******************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__, __webpack_require__.p, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 3:21-35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var marko_template = module.exports = __webpack_require__(/*! marko/dist/html */ "marko/dist/html").t(__filename),
    marko_componentType = "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/test.marko",
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer"),
    template = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/with-class-component-plugin/test.marko"),
    module_manifest = __webpack_require__(/*! ./../../../../__MARKO_WEBPACK__MANIFEST.js */ "./__MARKO_WEBPACK__MANIFEST.js"),
    manifest = module_manifest.default || module_manifest,
    marko_dynamicTag = __webpack_require__(/*! marko/dist/runtime/helpers/dynamic-tag */ "marko/dist/runtime/helpers/dynamic-tag"),
    marko_loadTag = __webpack_require__(/*! marko/dist/runtime/helpers/load-tag */ "marko/dist/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(__webpack_require__(/*! marko/dist/core-tags/components/init-components-tag */ "marko/dist/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(__webpack_require__(/*! marko/dist/core-tags/core/await/reorderer-renderer */ "marko/dist/core-tags/core/await/reorderer-renderer"));

function renderAssets() {
  const assets = this.___assets;
  const nonce = this.global.cspNonce;
  this.___renderAssets = this.___assets = undefined;
  this.flush = this.___flush;
  this.end = this.___end;

  if (assets) {
    __webpack_require__.p && this.script(`$mwp=${JSON.stringify(__webpack_require__.p)}`);

    if (assets.js) {
      const nonceAttr = nonce ? ` nonce=${JSON.stringify(nonce)}` : "";
      assets.js.forEach(js => {
        this.write(
          `<script src=${JSON.stringify(__webpack_require__.p+js)}${nonceAttr} async></script>`
        );
      });
    }

    if (assets.css) {
      assets.css.forEach(css => {
        this.write(
          `<link rel="stylesheet" href=${JSON.stringify(__webpack_require__.p+css)}>`
        );
      });
    }
  }
};

function outFlushOverride() {
  this.___renderAssets();
  this.flush();
};

function outEndOverride(data, encoding, callback) {
  this.___renderAssets();
  this.end(data, encoding, callback);
};

function render(input, out, __component, component, state) {
  var data = input;

  out.___flush = out.flush;

  out.___end = out.end;

  out.___renderAssets = renderAssets;

  out.___assets = manifest.getAssets("test_nzzJ", out.global.buildName);

  out.flush = outFlushOverride;

  out.end = outEndOverride;

  marko_dynamicTag(out, template, function() {
    return input;
  }, null, null, null, __component, "0");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "1");
}

marko_template._ = marko_renderer(render, {
    d_: true,
    e_: marko_componentType
  });

marko_template.meta = {
    id: "/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin/test.marko",
    tags: [
      "./test.marko",
      "marko/dist/core-tags/components/init-components-tag",
      "marko/dist/core-tags/core/await/reorderer-renderer"
    ]
  };


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ "marko/dist/core-tags/components/init-components-tag":
/*!**********************************************************************!*\
  !*** external "marko/dist/core-tags/components/init-components-tag" ***!
  \**********************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/core-tags/components/init-components-tag;

/***/ }),

/***/ "marko/dist/core-tags/core/await/reorderer-renderer":
/*!*********************************************************************!*\
  !*** external "marko/dist/core-tags/core/await/reorderer-renderer" ***!
  \*********************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/core-tags/core/await/reorderer-renderer;

/***/ }),

/***/ "marko/dist/html":
/*!**********************************!*\
  !*** external "marko/dist/html" ***!
  \**********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/html;

/***/ }),

/***/ "marko/dist/runtime/components/renderer":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/renderer" ***!
  \*********************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/components/renderer;

/***/ }),

/***/ "marko/dist/runtime/helpers/dynamic-tag":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/helpers/dynamic-tag" ***!
  \*********************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/helpers/dynamic-tag;

/***/ }),

/***/ "marko/dist/runtime/helpers/load-tag":
/*!******************************************************!*\
  !*** external "marko/dist/runtime/helpers/load-tag" ***!
  \******************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/helpers/load-tag;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!**********************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin/server.js ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const http = __webpack_require__(/*! http */ "http");
const test = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/with-class-component-plugin/test.marko?assets");

http
  .createServer((req, res) => {
    test.render({}, res);
  })
  .listen(0);

})();

/******/ })()
;