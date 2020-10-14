/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/__tests__/fixtures/basic-template/test.marko":
/*!**********************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template/test.marko ***!
  \**********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:21-35 */
/*! CommonJS bailout: module.exports is used directly at 7:13-27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var marko_template = module.exports = __webpack_require__(/*! marko/dist/vdom */ "marko/dist/vdom").t(),
    components_registry_browser = __webpack_require__(/*! marko/dist/runtime/components/registry-browser */ "marko/dist/runtime/components/registry-browser"),
    marko_registerComponent = components_registry_browser.r,
    marko_componentType = marko_registerComponent("/@marko/webpack-tests$x.x.x/fixtures/basic-template/test.marko", function() {
      return module.exports;
    }),
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer"),
    marko_defineComponent = __webpack_require__(/*! marko/dist/runtime/components/defineComponent */ "marko/dist/runtime/components/defineComponent"),
    marko_createElement = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/v-element */ "marko/dist/runtime/vdom/helpers/v-element"),
    marko_const = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/const */ "marko/dist/runtime/vdom/helpers/const"),
    marko_const_nextId = marko_const("4aca1a"),
    marko_node0 = marko_createElement("h1", null, "0", null, 1, 0, {
        i: marko_const_nextId()
      })
      .t("Hello World");

function render(input, out, __component, component, state) {
  var data = input;

  out.n(marko_node0, component);
}

marko_template._ = marko_renderer(render, {
    d_: true,
    e_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);


/***/ }),

/***/ "marko/dist/runtime/components/defineComponent":
/*!****************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent" ***!
  \****************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/__tests__/fixtures/basic-template/test.marko");
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ })()
;