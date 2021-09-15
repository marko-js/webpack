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

### Tag: `<webpack-assets>`

The `<webpack-assets>` tag can be used along with the plugin in a multi-compiler setup. This tag allows you to inject `<script>`/`<style>` tags into a server-rendered template for the assets of an entry in the client compiler.

#### Example Usage

```marko
<webpack-assets entry="tracking"/>
```

#### Example Config

```js
// ...
export default [
  {
    entry: "./server.js",
    plugins: [markoPlugin.server]
    // ...
  },
  {
    // ...
    entry: {
      tracking: "./tracking.js"
    },
    plugins: [markoPlugin.browser]
  }
];
```

# Installation

> `@marko/webpack` >= 7 Only supports Marko 5+.
> For Marko 4 support use `@marko/webpack@6`.

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
          test: /\.marko$/,
          loader: "@marko/webpack/loader"
        }
      ]
    },
    plugins: [markoPlugin.server]
  },
  {
    rules: [
      {
        test: /\.marko$/,
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

## Babel options (Marko 5+)

If you are using Marko 5 with this plugin you can manually override the Babel configuration used by passing a `babelConfig` object along side the `@marko/webpack/loader`. By default Babels regular [config file resolution](https://babeljs.io/docs/en/config-files) will be used.

```javascript
export default {
    module: {
      rules: [
        {
          test: /\.marko$/,
          loader: "@marko/webpack/loader",
          options: {
            babelConfig: {
              presets: [
                ["@babel/preset-env", { node: "current" }]
              ]
            }
          }
        }
      ]
    }
  },
```

## Multiple client side compilers

Sometimes you need to have multiple compilers for your client side bundles. For example with [`i18n`](https://github.com/webpack/webpack/tree/master/examples/i18n) or [even shipping dynamic runtime bundles to the browser](https://github.com/eBay/arc/tree/master/packages/arc-webpack).

The Marko webpack browser plugin can be passed to multiple webpack compilers. At runtime you can provide a `$global.buildName` when rendering which will cause assets from the webpack compiler with that name to be included in the page.

For example with the webpack i18n plugin you might have a config like the following:

```js
import MarkoPlugin from "@marko/webpack/plugin";
import I18nPlugin from "i18n-webpack-plugin";

const languages = {
  en: null,
  de: require("./de.json")
};

const markoPlugin = new MarkoPlugin();

export default [
  {
    name: "Server",
    entry: "./server.js",
    module: {
      rules: [
        {
          test: /\.marko$/,
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
        test: /\.marko$/,
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

With the above config you can render your top level Marko template server side with a `$global.buildName`, like so:

```javascript
template.render({ $global: { buildName: "Browser-de" } });
```

This will automatically send assets for the German language.
Of course in this case you'll want to conditionally send the appropriate assets given a users locale. This can be some simply, like so:

```javascript
template.render({ $global: { buildName: `Browser-${req.language}` } });
```

Note: If a bundle with the provided name does not exist an error will be thrown.

## Multiple copies of Marko

In some cases you may want to embed multiple isolated copies of Marko on the page. Since Marko relies on some `window` properties to initialize this can cause issues. For example, by default Marko will read the server rendered hydration code from `window.$components`. In Marko you can change these `window` properties by rendering with `{ $global: { runtimeId: "MY_MARKO_RUNTIME_ID" } }` as input on the server side.

This plugin exposes a `runtimeId` option produces output that automatically sets `$global.runtimeId` on the server side and initializes properly in the browser.
The `runtimeId` will default to the [`uniqueName` option](https://webpack.js.org/configuration/output/#outputuniquename) from the server compiler in the webpack config.

```js
import MarkoPlugin from "@marko/webpack/plugin";

const markoPlugin = new MarkoPlugin({
  runtimeId: "MY_MARKO_RUNTIME_ID" // default to webpack `output.uniqueName` option.
});
```

Note: This option will also override the default values for the `jsonpFunction`, `chunkCallbackName` and `hotUpdateFunction` webpack `output` options, which all use global variables, to be prefixed with the `runtimeId`.

## Dynamic public paths

When using the plugin, the server will automatically sync the runtime [`__webpack_public_path__`](https://webpack.js.org/guides/public-path/#on-the-fly) with the browser.
This means that you only need to setup the dynamic public path on the server side.

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
