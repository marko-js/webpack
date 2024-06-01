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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?browser-entry");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko":
/*!*********************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/vdom/index.js */ "marko/dist/runtime/vdom/index.js");
/* harmony import */ var marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css");
/* harmony import */ var marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/const-element.js */ "marko/dist/runtime/vdom/helpers/const-element.js");
/* harmony import */ var marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/components/renderer.js */ "marko/dist/runtime/components/renderer.js");
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/runtime/components/registry.js */ "marko/dist/runtime/components/registry.js");
/* harmony import */ var marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marko/dist/runtime/components/defineComponent.js */ "marko/dist/runtime/components/defineComponent.js");
/* harmony import */ var marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_5__);

const _marko_componentType = "iUh1CVCp",
  _marko_template = Object(marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__["t"])(_marko_componentType);
/* harmony default export */ __webpack_exports__["default"] = (_marko_template);


const _marko_node = marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_2___default()("div", null, 0);


Object(marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_4__["r"])(_marko_componentType, () => _marko_template);
const _marko_component = {
  onCreate() {
    console.log(A);
  }
};
_marko_template._ = marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_3___default()(function (input, out, _componentDef, _component, state, $global) {
  out.n(_marko_node, _component);
}, {
  t: _marko_componentType
}, _marko_component);

_marko_template.Component = marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_5___default()(_marko_component, _marko_template._);

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css":
/*!*******************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css!./=!./src/loader/index.ts!./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?virtual=./test.marko.css":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css = ./src/loader/index.ts!./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?virtual=./test.marko.css ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?browser-entry":
/*!****************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?browser-entry ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_components_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/components/index.js */ "marko/dist/runtime/components/index.js");
/* harmony import */ var marko_dist_runtime_components_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _test_marko_css_PROJECT_src_loader_index_ts_PROJECT_src_tests_fixtures_with_class_component_plugin_dynamic_bundle_test_marko_virtual_test_marko_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.marko.css = ./src/loader/index.ts!./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?virtual=./test.marko.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css!./=!./src/loader/index.ts!./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?virtual=./test.marko.css");
/* harmony import */ var _components_nested_index_marko__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/nested/index.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko");
if (window.$mwp) __webpack_require__.p = $mwp;



Object(marko_dist_runtime_components_index_js__WEBPACK_IMPORTED_MODULE_0__["init"])();

/***/ }),

/***/ "marko/dist/runtime/components/defineComponent.js":
/*!*******************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent.js" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/defineComponent.js");

/***/ }),

/***/ "marko/dist/runtime/components/index.js":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/index.js" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/index.js");

/***/ }),

/***/ "marko/dist/runtime/components/registry.js":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/components/registry.js" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/registry.js");

/***/ }),

/***/ "marko/dist/runtime/components/renderer.js":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/components/renderer.js" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/renderer.js");

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/const-element.js":
/*!*******************************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/const-element.js" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/vdom/helpers/const-element.js");

/***/ }),

/***/ "marko/dist/runtime/vdom/index.js":
/*!***************************************************!*\
  !*** external "marko/dist/runtime/vdom/index.js" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/vdom/index.js");

/***/ })

/******/ });