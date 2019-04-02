import * as path from "path";
import * as webpack from "webpack";
import MarkoPlugin from "../../../src/plugin";
import ExtractCSSPlugin from "mini-css-extract-plugin";

const markoPlugin = new MarkoPlugin();

export default [
  {
    name: "server",
    target: "async-node",
    entry: path.join(__dirname, "server.js"),
    module: {
      rules: [
        {
          test: /\.marko$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.BUNDLE": true
      }),
      markoPlugin.server
    ]
  },
  {
    name: "browser",
    target: "web",
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
      }),
      markoPlugin.browser
    ]
  }
];
