const http = require("http");
const test = require("./test.marko");

http
  .createServer((req, res) => {
    test.render({}, res);
  })
  .listen(0);
