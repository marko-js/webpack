/******/ ({

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko":
/*!*********************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/html */ "marko/dist/runtime/html");
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_1__);
const _marko_template = Object(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_1__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);


const _marko_componentType = "iUh1CVCp",
      _marko_component = {
  onCreate() {
    console.log(__BUILD_ID__);
  }

};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_0___default()(function (input, out, _component, component, state) {
  out.w("<div></div>");
}, {
  t: _marko_componentType
}, _marko_component);

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/server.js":
/*!*************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/server.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const http = __webpack_require__(/*! http */ "http");
const test = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?server-entry");

http
  .createServer((req, res) => {
    test.render({ $global: { buildName: "A" } }, res);
  })
  .listen(0);


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko":
/*!**************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_nested_index_marko__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/nested/index.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko");
/* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/helpers/render-tag */ "marko/dist/runtime/helpers/render-tag");
/* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/html */ "marko/dist/runtime/html");
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__);
const _marko_template = Object(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);




const _marko_componentType = "xbStr3Q2",
      _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2___default()(function (input, out, _component, component, state) {
  out.w("<h1>Hello World</h1>");

  marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1___default()(_components_nested_index_marko__WEBPACK_IMPORTED_MODULE_0__["default"], {}, out, _component, "1");
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?server-entry":
/*!***************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?server-entry ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test_marko__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko");
/* harmony import */ var _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !@marko/webpack/loader!?manifest */ "./src/loader/index.ts!./?manifest");
/* empty/unused harmony star reexport *//* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/helpers/render-tag */ "marko/dist/runtime/helpers/render-tag");
/* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/core-tags/components/init-components-tag.js */ "marko/dist/core-tags/components/init-components-tag.js");
/* harmony import */ var marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/core-tags/core/await/reorderer-renderer.js */ "marko/dist/core-tags/core/await/reorderer-renderer.js");
/* harmony import */ var marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! marko/dist/runtime/html */ "marko/dist/runtime/html");
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_6__);
const _marko_template = Object(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_6__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);




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
        this.write(`<script src=${JSON.stringify(__webpack_require__.p + js)}${nonceAttr} async></script>`);
      });
    }

    if (assets.css) {
      assets.css.forEach(css => {
        this.write(`<link rel="stylesheet" href=${JSON.stringify(__webpack_require__.p + css)}>`);
      });
    }
  }
}

function outFlushOverride() {
  this.___renderAssets();

  this.flush();
}

function outEndOverride(data, encoding, callback) {
  this.___renderAssets();

  this.end(data, encoding, callback);
}






const _marko_componentType = "xbStr3Q2",
      _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_5___default()(function (input, out, _component, component, state) {
  const curAssets = out.___assets;
  const newAssets = _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_1__["default"].getAssets("test_xbSt", out.global.buildName);

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

  marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2___default()(_test_marko__WEBPACK_IMPORTED_MODULE_0__["default"], input, out, _component, "0");

  marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2___default()(marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_3___default.a, {}, out, _component, "1");

  marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_2___default()(marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_4___default.a, {}, out, _component, "2");
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

/***/ }),

/***/ "./src/loader/index.ts!./?manifest":
/*!***************************************!*\
  !*** ./src/loader/index.ts!?manifest ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  getAssets(entry, buildName) {
    const buildAssets = this.builds[buildName];
    if (!buildAssets) {
      throw new Error("Unable to load assets for build with a '$global.buildName' of '" + buildName + "'.");
    }

    return buildAssets[entry];
  },
  builds: {"browser-A":{"test_xbSt":{"css":["test_xbSt.A.css"],"js":["test_xbSt.A.js"]}},"browser-B":{"test_xbSt":{"css":["test_xbSt.B.css"],"js":["test_xbSt.B.js"]}},"browser-C":{"test_xbSt":{"css":["test_xbSt.C.css"],"js":["test_xbSt.C.js"]}}}
});

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = http;

/***/ }),

/***/ "marko/dist/core-tags/components/init-components-tag.js":
/*!*************************************************************************!*\
  !*** external "marko/dist/core-tags/components/init-components-tag.js" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/core-tags/components/init-components-tag.js;

/***/ }),

/***/ "marko/dist/core-tags/core/await/reorderer-renderer.js":
/*!************************************************************************!*\
  !*** external "marko/dist/core-tags/core/await/reorderer-renderer.js" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/core-tags/core/await/reorderer-renderer.js;

/***/ }),

/***/ "marko/dist/runtime/components/renderer":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/renderer" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/components/renderer;

/***/ }),

/***/ "marko/dist/runtime/helpers/render-tag":
/*!********************************************************!*\
  !*** external "marko/dist/runtime/helpers/render-tag" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/helpers/render-tag;

/***/ }),

/***/ "marko/dist/runtime/html":
/*!******************************************!*\
  !*** external "marko/dist/runtime/html" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/html;

/***/ })

/******/ });