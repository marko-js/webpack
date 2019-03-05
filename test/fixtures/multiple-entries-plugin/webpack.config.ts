import * as path from "path";
import * as webpack from "webpack";
import MarkoPlugin from "../../../src/plugin";

const markoPlugin = new MarkoPlugin({});

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
    plugins:[
      new webpack.DefinePlugin({
        "process.env.BUNDLE": true
      }),
      markoPlugin.server
    ]
  },
  {
    name: "browser",
    target: "web",
    entry: markoPlugin.emptyEntry,
    module: {
      rules: [
        {
          test: /\.marko$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    optimization: {
      splitChunks: {
        minSize: 0,
        minChunks: 2,
        chunks: "all"
      }
    },
    plugins: [markoPlugin.browser]
  } 
];
