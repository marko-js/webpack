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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/__tests__/fixtures/with-css-extract/test.marko");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/__tests__/fixtures/with-css-extract/test.marko":
/*!************************************************************!*\
  !*** ./src/__tests__/fixtures/with-css-extract/test.marko ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var marko_dist_runtime_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/vdom */ "marko/dist/runtime/vdom");
/* harmony import */ var marko_dist_runtime_vdom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _test_marko_css_PROJECT_src_loader_index_ts_PROJECT_src_tests_fixtures_with_css_extract_test_marko_virtual_test_marko_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.marko.css = ./src/loader/index.ts!./src/__tests__/fixtures/with-css-extract/test.marko?virtual=./test.marko.css */ "./src/__tests__/fixtures/with-css-extract/test.marko.css!./=!./src/loader/index.ts!./src/__tests__/fixtures/with-css-extract/test.marko?virtual=./test.marko.css");
/* harmony import */ var marko_dist_runtime_vdom_helpers_v_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/v-element */ "marko/dist/runtime/vdom/helpers/v-element");
/* harmony import */ var marko_dist_runtime_vdom_helpers_v_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom_helpers_v_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer");
/* harmony import */ var marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_runtime_components_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/runtime/components/registry */ "marko/dist/runtime/components/registry");
/* harmony import */ var marko_dist_runtime_components_registry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_registry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var marko_dist_runtime_components_defineComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marko/dist/runtime/components/defineComponent */ "marko/dist/runtime/components/defineComponent");
/* harmony import */ var marko_dist_runtime_components_defineComponent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_defineComponent__WEBPACK_IMPORTED_MODULE_5__);


const _marko_template = Object(marko_dist_runtime_vdom__WEBPACK_IMPORTED_MODULE_0__["t"])();

/* harmony default export */ __webpack_exports__["default"] = (_marko_template);



const _marko_node = marko_dist_runtime_vdom_helpers_v_element__WEBPACK_IMPORTED_MODULE_2___default()("h1", null, "0", null, 1, 0).t("Hello World");




const _marko_componentType = Object(marko_dist_runtime_components_registry__WEBPACK_IMPORTED_MODULE_4__["r"])("KsMKZ++B", () => _marko_template),
      _marko_component = {};

_marko_template._ = marko_dist_runtime_components_renderer__WEBPACK_IMPORTED_MODULE_3___default()(function (input, out, _component, component, state) {
  out.n(_marko_node, component);
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

_marko_template.Component = marko_dist_runtime_components_defineComponent__WEBPACK_IMPORTED_MODULE_5___default()(_marko_component, _marko_template._);

/***/ }),

/***/ "./src/__tests__/fixtures/with-css-extract/test.marko.css!./=!./src/loader/index.ts!./src/__tests__/fixtures/with-css-extract/test.marko?virtual=./test.marko.css":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-css-extract/test.marko.css = ./src/loader/index.ts!./src/__tests__/fixtures/with-css-extract/test.marko?virtual=./test.marko.css ***!
  \**********************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "marko/dist/runtime/components/defineComponent":
/*!****************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/defineComponent");

/***/ }),

/***/ "marko/dist/runtime/components/registry":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/registry" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/registry");

/***/ }),

/***/ "marko/dist/runtime/components/renderer":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/renderer" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/components/renderer");

/***/ }),

/***/ "marko/dist/runtime/vdom":
/*!******************************************!*\
  !*** external "marko/dist/runtime/vdom" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/vdom");

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/v-element":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/v-element" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marko/dist/runtime/vdom/helpers/v-element");

/***/ })

/******/ });