/******/ ({

/***/ "./src/__tests__/fixtures/with-css-extract/test.marko":
/*!************************************************************!*\
  !*** ./src/__tests__/fixtures/with-css-extract/test.marko ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./test.marko.css */ "./src/__tests__/fixtures/with-css-extract/test.marko.css")
// Compiled using marko@4.18.47 - DO NOT EDIT
"use strict";

var marko_template = module.exports = __webpack_require__(/*! marko/dist/vdom */ "marko/dist/vdom").t(),
    components_registry_browser = __webpack_require__(/*! marko/dist/runtime/components/registry-browser */ "marko/dist/runtime/components/registry-browser"),
    marko_registerComponent = components_registry_browser.r,
    marko_componentType = marko_registerComponent("/@marko/webpack-tests$x.x.x/fixtures/with-css-extract/test.marko", function() {
      return module.exports;
    }),
    marko_renderer = __webpack_require__(/*! marko/dist/runtime/components/renderer */ "marko/dist/runtime/components/renderer"),
    marko_defineComponent = __webpack_require__(/*! marko/dist/runtime/components/defineComponent */ "marko/dist/runtime/components/defineComponent"),
    marko_createElement = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/v-element */ "marko/dist/runtime/vdom/helpers/v-element"),
    marko_const = __webpack_require__(/*! marko/dist/runtime/vdom/helpers/const */ "marko/dist/runtime/vdom/helpers/const"),
    marko_const_nextId = marko_const("475986"),
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

/***/ "./src/__tests__/fixtures/with-css-extract/test.marko.css":
/*!****************************************************************!*\
  !*** ./src/__tests__/fixtures/with-css-extract/test.marko.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "marko/dist/runtime/components/defineComponent":
/*!****************************************************************!*\
  !*** external "marko/dist/runtime/components/defineComponent" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/components/defineComponent;

/***/ }),

/***/ "marko/dist/runtime/components/registry-browser":
/*!*****************************************************************!*\
  !*** external "marko/dist/runtime/components/registry-browser" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/components/registry-browser;

/***/ }),

/***/ "marko/dist/runtime/components/renderer":
/*!*********************************************************!*\
  !*** external "marko/dist/runtime/components/renderer" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/components/renderer;

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/const":
/*!********************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/const" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/vdom/helpers/const;

/***/ }),

/***/ "marko/dist/runtime/vdom/helpers/v-element":
/*!************************************************************!*\
  !*** external "marko/dist/runtime/vdom/helpers/v-element" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/runtime/vdom/helpers/v-element;

/***/ }),

/***/ "marko/dist/vdom":
/*!**********************************!*\
  !*** external "marko/dist/vdom" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/dist/vdom;

/***/ })

/******/ });