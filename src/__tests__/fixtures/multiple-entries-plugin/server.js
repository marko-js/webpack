const http = require("http");
const foo = require("./foo.marko");
const bar = require("./bar.marko");
const nested = require("./nested/template.marko");

http
  .createServer((req, res) => {
    if (req.url === "/foo") foo.render({}, res);
    if (req.url === "/bar") bar.render({}, res);
    if (req.url === "/nested") nested.render({}, res);
  })
  .listen(0);
