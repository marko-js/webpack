const http = __webpack_require__(/*! http */ "http");
const test = __webpack_require__(/*! ./test.marko */ "./test/fixtures/with-class-component-plugin/test.marko?assets");

http
  .createServer((req, res) => {
    test.render({}, res);
  })
  .listen(0);