const http = require("http");
const foo = require("./foo.marko");
const bar = require("./bar.marko");

http
  .createServer((req, res) => {
    if (req.url === "/foo") foo.render({}, res);
    if (req.url === "/bar") bar.render({}, res);
  })
  .listen(0);
