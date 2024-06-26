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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/server.js":
/*!**********************************************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/server.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const http = __webpack_require__(/*! http */ "http");
const test = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?server-entry");

http
  .createServer((req, res) => {
    test.render({}, res);
  })
  .listen(0);


/***/ }),

/***/ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko":
/*!***********************************************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/html/index.js */ "marko/dist/runtime/html/index.js");
/* harmony import */ var marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/components/renderer.js */ "marko/dist/runtime/components/renderer.js");
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_1__);

const _marko_componentType = "8XgZ/c27",
  _marko_template = Object(marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__["t"])(_marko_componentType);
/* harmony default export */ __webpack_exports__["default"] = (_marko_template);

const _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_1___default()(function (input, out, _componentDef, _component, state, $global) {
  out.w("<h1>Hello World</h1>");
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

/***/ }),

/***/ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?server-entry":
/*!************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?server-entry ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/html/index.js */ "marko/dist/runtime/html/index.js");
/* harmony import */ var marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _test_marko__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.marko */ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko");
/* harmony import */ var _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !@marko/webpack/loader!?manifest */ "./src/loader/index.ts!./?manifest");
/* empty/unused harmony star reexport *//* harmony import */ var marko_dist_core_tags_core_flush_here_and_after_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/core-tags/core/__flush_here_and_after__.js */ "marko/dist/core-tags/core/__flush_here_and_after__.js");
/* harmony import */ var marko_dist_core_tags_core_flush_here_and_after_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_core_tags_core_flush_here_and_after_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/runtime/helpers/render-tag.js */ "marko/dist/runtime/helpers/render-tag.js");
/* harmony import */ var marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marko/dist/core-tags/components/init-components-tag.js */ "marko/dist/core-tags/components/init-components-tag.js");
/* harmony import */ var marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! marko/dist/core-tags/core/await/reorderer-renderer.js */ "marko/dist/core-tags/core/await/reorderer-renderer.js");
/* harmony import */ var marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! marko/dist/runtime/components/renderer.js */ "marko/dist/runtime/components/renderer.js");
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_7__);

const _marko_componentType = "6kM99PmO",
  _marko_template = Object(marko_dist_runtime_html_index_js__WEBPACK_IMPORTED_MODULE_0__["t"])(_marko_componentType);
/* harmony default export */ __webpack_exports__["default"] = (_marko_template);



const crossOriginAttr = new URL(__webpack_require__.p, "file:").protocol === "file:" ? "" : " crossorigin";
function renderAssets(out) {
  const $global = out.global;
  const entries = $global.___entries;
  $global.___entries = undefined;
  if (entries) {
    __webpack_require__.p && out.script(`$mwp_testruntime=${JSON.stringify(__webpack_require__.p)}`);
    const buildName = $global.buildName;
    const nonce = $global.cspNonce;
    const nonceAttr = nonce ? ` nonce=${JSON.stringify(nonce)}` : "";
    const written = $global.___writtenAssets || ($global.___writtenAssets = new Set());
    let scripts = "";
    let styles = "";
    for (const entry of entries) {
      const assets = _marko_webpack_loader_manifest__WEBPACK_IMPORTED_MODULE_2__["default"].getAssets(entry, buildName);
      if (assets.js) {
        for (const href of assets.js) {
          if (!written.has(href)) {
            written.add(href);
            scripts += `<script src=${JSON.stringify(__webpack_require__.p + href)}${nonceAttr + crossOriginAttr} async></script>`;
          }
        }
      }
      if (assets.css) {
        for (const href of assets.css) {
          if (!written.has(href)) {
            written.add(href);
            styles += `<link rel="stylesheet" href=${JSON.stringify(__webpack_require__.p + href)}>`;
          }
        }
      }
    }
    out.write(scripts + styles);
  }
}





const _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_7___default()(function (input, out, _componentDef, _component, state, $global) {
  out.global.runtimeId = "testruntime";
  out.global.___renderAssets = renderAssets;
  (out.global.___entries || (out.global.___entries = [])).push("test_8XgZ");
  marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4___default()(marko_dist_core_tags_core_flush_here_and_after_js__WEBPACK_IMPORTED_MODULE_3___default.a, {
    "renderBody": out => {
      const outAlias = out;
      outAlias.global.___renderAssets && outAlias.global.___renderAssets(outAlias);
    }
  }, out, _componentDef, "0");
  marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4___default()(_test_marko__WEBPACK_IMPORTED_MODULE_1__["default"], input, out, _componentDef, "1");
  marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4___default()(marko_dist_core_tags_components_init_components_tag_js__WEBPACK_IMPORTED_MODULE_5___default.a, {}, out, _componentDef, "2");
  marko_dist_runtime_helpers_render_tag_js__WEBPACK_IMPORTED_MODULE_4___default()(marko_dist_core_tags_core_await_reorderer_renderer_js__WEBPACK_IMPORTED_MODULE_6___default.a, {}, out, _componentDef, "3");
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
  build: {"test_8XgZ":{"js":["test_8XgZ.js"]}}
});

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "marko/dist/core-tags/components/init-components-tag.js":
/*!*************************************************************************!*\
  !*** external "marko/dist/core-tags/components/init-components-tag.js" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/core-tags/components/init-components-tag.js");

/***/ }),

/***/ "marko/dist/core-tags/core/__flush_here_and_after__.js":
/*!************************************************************************!*\
  !*** external "marko/dist/core-tags/core/__flush_here_and_after__.js" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/core-tags/core/__flush_here_and_after__.js");

/***/ }),

/***/ "marko/dist/core-tags/core/await/reorderer-renderer.js":
/*!************************************************************************!*\
  !*** external "marko/dist/core-tags/core/await/reorderer-renderer.js" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/core-tags/core/await/reorderer-renderer.js");

/***/ }),

/***/ "marko/dist/runtime/components/renderer.js":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/components/renderer.js" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/renderer.js");

/***/ }),

/***/ "marko/dist/runtime/helpers/render-tag.js":
/*!***********************************************************!*\
  !*** external "marko/dist/runtime/helpers/render-tag.js" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/helpers/render-tag.js");

/***/ }),

/***/ "marko/dist/runtime/html/index.js":
/*!***************************************************!*\
  !*** external "marko/dist/runtime/html/index.js" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/html/index.js");

/***/ })

/******/ });