const http = require("http");
const test = require("./test.marko");

http
  .createServer((req, res) => {
    test.render({ $global: { buildName: "A" } }, res);
  })
  .listen(0);
