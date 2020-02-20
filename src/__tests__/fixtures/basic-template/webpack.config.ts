import * as path from "path";

export default {
  entry: path.join(__dirname, "test.marko"),
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "@marko/webpack/loader"
      }
    ]
  }
};
