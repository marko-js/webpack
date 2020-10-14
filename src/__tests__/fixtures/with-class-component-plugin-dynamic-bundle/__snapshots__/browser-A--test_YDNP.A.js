/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css":
/*!*******************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css ***!
  \*******************************************************************************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css":
/*!******************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css ***!
  \******************************************************************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko":
/*!*********************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko ***!
  \*********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 4:21-35 */
/*! CommonJS bailout: module.exports is used directly at 13:13-27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./style.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css");
"use strict";

var marko_template = module.exports = __webpack_require__(/*! marko/dist/vdom */ "marko/dist/vdom").t(),
    marko_component = {
        onCreate: function() {
          console.log(A);
        }
      },
    components_registry_browser = __webpack_require__(/*! marko/dist/runtime/components/registry-browser */ "marko/dist/runtime/components/registry-browser"),
    marko_registerComponent = components_registry_browser.r,
    marko_componentType = marko_registerComponent("/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer"),
    marko_defineComponent = __webpack_require__(/*! marko/dist/runtime/components/defineComponent */ "marko/dist/runtime/components/defineComponent"),
    marko_createElement = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/v-element */ "marko/dist/runtime/vdom/helpers/v-element"),
    marko_const = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/const */ "marko/dist/runtime/vdom/helpers/const"),
    marko_const_nextId = marko_const("cb0d84"),
    marko_node0 = marko_createElement("div", null, "0", null, 0, 0, {
        i: marko_const_nextId()
      });

function render(input, out, __component, component, state) {
  var data = input;

  out.n(marko_node0, component);
}

marko_template._ = marko_renderer(render, {
    e_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);


/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko?dependencies":
/*!**********************************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko?dependencies ***!
  \**********************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./index.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko")

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies":
/*!***************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies ***!
  \***************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./test.marko.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css");
__webpack_require__(/*! ./components/nested/index.marko?dependencies */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko?dependencies")

/***/ }),

/***/ "marko/dist/runtime/components/defineComponent":
/*!****************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent" ***!
  \****************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/components/defineComponent;

/***/ }),

/***/ "marko/dist/runtime/components/registry-browser":
/*!*****************************************************************!*\
  !*** external "marko/dist/runtime/components/registry-browser" ***!
  \*****************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/components/registry-browser;

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

/***/ "marko/dist/runtime/vdom/helpers/const":
/*!********************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/const" ***!
  \********************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/vdom/helpers/const;

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/v-element":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/v-element" ***!
  \************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/runtime/vdom/helpers/v-element;

/***/ }),

/***/ "marko/dist/vdom":
/*!**********************************!*\
  !*** external "marko/dist/vdom" ***!
  \**********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/dist/vdom;

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
(() => {
/*!**********************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?hydrate ***!
  \**********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
__webpack_require__(/*! ./test.marko?dependencies */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies");
window.$initComponents && $initComponents();

})();

/******/ })()
;