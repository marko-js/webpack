/******/ ({

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko":
/*!*********************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


      const { register } = __webpack_require__(/*! marko/components */ "marko/components");
      const component = __webpack_require__(/*! ./index.marko */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko");
      register("/@marko/webpack-tests$x.x.x/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko", component);
      
__webpack_require__(/*! ./style.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css");

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css":
/*!*******************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/style.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css":
/*!******************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies":
/*!***************************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./test.marko.css */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko.css");
__webpack_require__(/*! ./components/nested/index.marko?dependencies */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/components/nested/index.marko?dependencies");

/***/ }),

/***/ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?hydrate":
/*!**********************************************************************************************!*\
  !*** ./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?hydrate ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


      if (window.$mwp) {
        __webpack_require__.p = $mwp;
      }

      __webpack_require__(/*! ./test.marko?dependencies */ "./src/__tests__/fixtures/with-class-component-plugin-dynamic-bundle/test.marko?dependencies");
      window.$initComponents && window.$initComponents();
    

/***/ }),

/***/ "marko/components":
/*!***********************************!*\
  !*** external "marko/components" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = marko/components;

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