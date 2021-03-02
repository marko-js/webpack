/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/__tests__/fixtures/asset-tag/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/webpack-assets/index.marko":
/*!***********************************************!*\
  !*** ./components/webpack-assets/index.marko ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !@marko/webpack/loader!?manifest */ "./src/loader/index.ts!./?manifest");
/* harmony import */ var marko_dist_runtime_html_helpers_attr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/html/helpers/attr */ "marko/dist/runtime/html/helpers/attr");
/* harmony import */ var marko_dist_runtime_html_helpers_attr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html_helpers_attr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var marko_dist_runtime_html_helpers_attrs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/html/helpers/attrs */ "marko/dist/runtime/html/helpers/attrs");
/* harmony import */ var marko_dist_runtime_html_helpers_attrs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html_helpers_attrs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/runtime/html */ "marko/dist/runtime/html");
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_4__);
const _marko_template = Object(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_4__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);





const _marko_componentType = "GHIxthSC",
      _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3___default()(function (input, out, _component, component, state) {
  const {
    entry,
    scriptAttrs,
    styleAttrs
  } = input;
  const assets = _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_0__["default"].getAssets(entry, out.global.buildName);

  if (assets.js) {
    const nonce = out.global.cspNonce;
    let _keyValue = 0;

    for (const js of assets.js) {
      const _keyScope = `[${_keyValue++}]`;
      out.w(`<script${marko_dist_runtime_html_helpers_attrs__WEBPACK_IMPORTED_MODULE_2___default()({
        "src": __webpack_require__.p + js,
        "nonce": nonce,
        ...scriptAttrs
      })}></script>`);
    }
  }

  if (assets.css) {
    let _keyValue2 = 0;

    for (const css of assets.css) {
      const _keyScope2 = `[${_keyValue2++}]`;
      out.w(`<link${marko_dist_runtime_html_helpers_attrs__WEBPACK_IMPORTED_MODULE_2___default()({
        "rel": "stylesheet",
        "href": __webpack_require__.p + css,
        ...styleAttrs
      })}>`);
    }
  }
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

/***/ }),

/***/ "./src/__tests__/fixtures/asset-tag/server.js":
/*!****************************************************!*\
  !*** ./src/__tests__/fixtures/asset-tag/server.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const http = __webpack_require__(/*! http */ "http");
const test = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/asset-tag/test.marko?server-entry");

http
  .createServer((req, res) => {
    test.render({}, res);
  })
  .listen(0);


/***/ }),

/***/ "./src/__tests__/fixtures/asset-tag/test.marko":
/*!*****************************************************!*\
  !*** ./src/__tests__/fixtures/asset-tag/test.marko ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_webpack_assets_index_marko__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/webpack-assets/index.marko */ "./components/webpack-assets/index.marko");
/* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/helpers/render-tag */ "marko/dist/runtime/helpers/render-tag");
/* harmony import */ var marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/html */ "marko/dist/runtime/html");
/* harmony import */ var marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__);
const _marko_template = Object(marko_dist_runtime_html__WEBPACK_IMPORTED_MODULE_3__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);




const _marko_componentType = "wUwFs+xe",
      _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_2___default()(function (input, out, _component, component, state) {
  out.w("<h1>Hello World</h1>");

  marko_dist_runtime_helpers_render_tag__WEBPACK_IMPORTED_MODULE_1___default()(_components_webpack_assets_index_marko__WEBPACK_IMPORTED_MODULE_0__["default"], {
    "entry": "other"
  }, out, _component, "1");
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

/***/ }),

/***/ "./src/__tests__/fixtures/asset-tag/test.marko?server-entry":
/*!******************************************************************!*\
  !*** ./src/__tests__/fixtures/asset-tag/test.marko?server-entry ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test_marko__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/asset-tag/test.marko");
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






const _marko_componentType = "wUwFs+xe",
      _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_5___default()(function (input, out, _component, component, state) {
  const curAssets = out.___assets;
  const newAssets = _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_1__["default"].getAssets("test_wUwF", out.global.buildName);

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
  getAssets(entry) {
    return this.build[entry];
  },
  build: {"other":{"js":["other.js"]},"test_wUwF":{"js":["test_wUwF.js"]}}
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

/***/ }),

/***/ "marko/dist/runtime/html/helpers/attr":
/*!*******************************************************!*\
  !*** external "marko/dist/runtime/html/helpers/attr" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/html/helpers/attr;

/***/ }),

/***/ "marko/dist/runtime/html/helpers/attrs":
/*!********************************************************!*\
  !*** external "marko/dist/runtime/html/helpers/attrs" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/html/helpers/attrs;

/***/ })

/******/ });