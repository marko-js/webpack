import * as path from "path";
import ExtractCSSPlugin from "mini-css-extract-plugin";

export default {
  entry: path.join(__dirname, "test.marko"),
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "@marko/webpack/loader"
      },
      {
        test: /\.css$/,
        use: [ExtractCSSPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new ExtractCSSPlugin({
      filename: `[name].css`,
      allChunks: true
    })
  ]
};
