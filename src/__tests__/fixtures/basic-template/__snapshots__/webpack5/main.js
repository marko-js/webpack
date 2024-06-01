/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "marko/dist/runtime/components/defineComponent.js":
/*!*******************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent.js" ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = require("marko/dist/runtime/components/defineComponent.js");

/***/ }),

/***/ "marko/dist/runtime/components/registry.js":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/components/registry.js" ***!
  \************************************************************/
/***/ ((module) => {

module.exports = require("marko/dist/runtime/components/registry.js");

/***/ }),

/***/ "marko/dist/runtime/components/renderer.js":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/components/renderer.js" ***!
  \************************************************************/
/***/ ((module) => {

module.exports = require("marko/dist/runtime/components/renderer.js");

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/const-element.js":
/*!*******************************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/const-element.js" ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = require("marko/dist/runtime/vdom/helpers/const-element.js");

/***/ }),

/***/ "marko/dist/runtime/vdom/index.js":
/*!***************************************************!*\
  !*** external "marko/dist/runtime/vdom/index.js" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("marko/dist/runtime/vdom/index.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template/test.marko ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marko/dist/runtime/vdom/index.js */ "marko/dist/runtime/vdom/index.js");
/* harmony import */ var marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/const-element.js */ "marko/dist/runtime/vdom/helpers/const-element.js");
/* harmony import */ var marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marko/dist/runtime/components/renderer.js */ "marko/dist/runtime/components/renderer.js");
/* harmony import */ var marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marko/dist/runtime/components/registry.js */ "marko/dist/runtime/components/registry.js");
/* harmony import */ var marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! marko/dist/runtime/components/defineComponent.js */ "marko/dist/runtime/components/defineComponent.js");
/* harmony import */ var marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_4__);

const _marko_componentType = "+6Wk26em",
  _marko_template = (0,marko_dist_runtime_vdom_index_js__WEBPACK_IMPORTED_MODULE_0__.t)(_marko_componentType);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_marko_template);

const _marko_node = marko_dist_runtime_vdom_helpers_const_element_js__WEBPACK_IMPORTED_MODULE_1___default()("h1", null, 1).t("Hello World");


(0,marko_dist_runtime_components_registry_js__WEBPACK_IMPORTED_MODULE_3__.r)(_marko_componentType, () => _marko_template);
const _marko_component = {};
_marko_template._ = marko_dist_runtime_components_renderer_js__WEBPACK_IMPORTED_MODULE_2___default()(function (input, out, _componentDef, _component, state, $global) {
  out.n(_marko_node, _component);
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);

_marko_template.Component = marko_dist_runtime_components_defineComponent_js__WEBPACK_IMPORTED_MODULE_4___default()(_marko_component, _marko_template._);
})();

/******/ })()
;