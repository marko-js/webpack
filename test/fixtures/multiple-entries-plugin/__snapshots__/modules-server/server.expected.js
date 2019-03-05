const http = __webpack_require__(/*! http */ "http");
const foo = __webpack_require__(/*! ./foo.marko */ "./test/fixtures/multiple-entries-plugin/foo.marko?assets");
const bar = __webpack_require__(/*! ./bar.marko */ "./test/fixtures/multiple-entries-plugin/bar.marko?assets");

http.createServer((req, res) => {
  if (req.url === '/foo') foo.render({}, res);
  if (req.url === '/bar') bar.render({}, res);
}).listen(0);