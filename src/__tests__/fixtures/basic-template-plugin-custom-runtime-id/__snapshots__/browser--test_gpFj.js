/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?dependencies":
/*!************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?dependencies ***!
  \************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {



/***/ }),

/***/ "marko/components":
/*!***********************************!*\
  !*** external "marko/components" ***!
  \***********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = marko/components;

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
(() => {
/*!*******************************************************************************************!*\
  !*** ./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?hydrate ***!
  \*******************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
__webpack_require__(/*! ./test.marko?dependencies */ "./src/__tests__/fixtures/basic-template-plugin-custom-runtime-id/test.marko?dependencies");
const { init } = __webpack_require__(/*! marko/components */ "marko/components");
init("testruntime");

})();

/******/ })()
;