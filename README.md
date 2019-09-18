<h1 align="center">
  <!-- Logo -->
  <img src="https://user-images.githubusercontent.com/1958812/62651340-98c0db00-b90d-11e9-944a-637334391d57.png" height="118"/>
  <br/>
  @marko/webpack
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- Language -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Format -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- CI -->
  <a href="https://travis-ci.com/marko-js/webpack">
  <img src="https://travis-ci.com/marko-js/webpack.svg?branch=master" alt="Build status"/>
  </a>
  <!-- NPM Version -->
  <a href="https://npmjs.org/package/@marko/webpack">
    <img src="https://img.shields.io/npm/v/@marko/webpack.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@marko/webpack">
    <img src="https://img.shields.io/npm/dm/@marko/webpack.svg" alt="Downloads"/>
  </a>
  <!-- Size -->
  <a href="https://npmjs.org/package/@marko/webpack">
    <img src="https://img.shields.io/badge/size-1.21kb-green.svg" alt="Browser Bundle Size"/>
  </a>
</h1>

A Marko plugin and loader for Webpack.

# Details

### Loader: `@marko/webpack/loader`

The loader portion of this module can be used standalone and simply transforms your Marko templates into the appropriate JavaScript depending on your webpack target.

You can override the output by adding a `target` option to the loader of `target: "server" | "browser"`.

### Plugin: `@marko/webpack/plugin`

The plugin actually creates two separate webpack plugins, the `browser` plugin and the `server` plugin.

These are intended to be used in a isomorphic [webpack multi compiler](https://github.com/webpack/webpack/tree/master/examples/multi-compiler) where you are bundling both the server and the browser. The way it works is that the server plugin is going to analyze the top level Marko components in your server and automatically communicate with the browser compiler to retrieve the assets for that template.

This plugin also analyzes the top level Marko templates and determines if it is possible for them to rerender (currently the heuristic is simply does the component have an associated `class` or `component.js`). The plugin will automatically skip sending down any unnecessary top level templates to the browser.

The end result is that you setup a multi compiler (as shown below) and you can simply import Marko templates, and all assets are automatically generated and inlined into an optimized server response. No need to keep track of a webpack manifest yourself!

# Installation

```console
npm install @marko/webpack
```

# Example

```javascript
import MarkoPlugin from "@marko/webpack/plugin";

const markoPlugin = new MarkoPlugin();

export default [
  {
    entry: "./server.js",
    module: {
      rules: [
        {
          test: /\.marko?$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    plugins: [markoPlugin.server]
  },
  {
    rules: [
      {
        test: /\.marko?$/,
        loader: "@marko/webpack/loader"
      },
      // If using `style` blocks with Marko you must use an appropriate loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ],
    plugins: [markoPlugin.browser]
  }
];
```

## Multiple client side compilers

Sometimes you need to have multiple compilers for your client side bundles. For example with [`i18n`](https://github.com/webpack/webpack/tree/master/examples/i18n) or [even shipping dynamic runtime bundles to the browser](https://github.com/eBay/arc/tree/master/packages/arc-webpack).

The Marko webpack plugin allows you to pass a function which is inlined into the server bundle and can respond with the name of the compiler whose assets should be sent to the browser.
For example with the webpack i18n plugin you might have a config like the following:

```js
import MarkoPlugin from "@marko/webpack/plugin";
import I18nPlugin from "i18n-webpack-plugin";

const languages = {
  en: null,
  de: require("./de.json")
};

const markoPlugin = new MarkoPlugin({
  // $global here is the `out.global` from Marko.
  getClientCompilerName($global) {
    // You must return the name of one of the browser compilers below.
    return `Browser-${language}`;
  }
});

export default [
  {
    name: "Server",
    entry: "./server.js",
    module: {
      rules: [
        {
          test: /\.marko?$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    plugins: [markoPlugin.server]
  },
  ...Object.keys(languages).map(language => ({
    name: `Browser-${language}`,
    rules: [
      {
        test: /\.marko?$/,
        loader: "@marko/webpack/loader"
      },
      // If using `style` blocks with Marko you must use an appropriate loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ],
    plugins: [new I18nPlugin(languages[language]), markoPlugin.browser]
  }))
];
```

With the above config you can render your top level Marko template server side with a `language` global, like so:

```
template.render({ $global: { language: "de" } });
```

This will automatically send assets for the German language.

## Dynamic public paths

When using the plugin, the server will automatically sync the runtime [`__webpack_public_path__`](https://webpack.js.org/guides/public-path/#on-the-fly) with the browser.
This means that you only need to setup the dynamic public path on the server side.

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
