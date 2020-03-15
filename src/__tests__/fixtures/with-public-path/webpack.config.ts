import * as path from "path";
import * as webpack from "webpack";
import MarkoPlugin from "../../../plugin";

const markoPlugin = new MarkoPlugin();
const publicPath = "/assets";

export default [
  {
    name: "server",
    target: "async-node",
    entry: path.join(__dirname, "server.js"),
    output: { publicPath },
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
    output: { publicPath },
    module: {
      rules: [
        {
          test: /\.marko$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    plugins: [markoPlugin.browser]
  }
];
