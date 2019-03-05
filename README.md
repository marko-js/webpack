<h1 align="center">
  <!-- Logo -->
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
  <a href="https://travis-ci.org/marko-js/webpack">
  <img src="https://img.shields.io/travis/marko-js/webpack.svg" alt="Build status"/>
  </a>
  <!-- Coverage -->
  <a href="https://coveralls.io/github/marko-js/webpack">
    <img src="https://img.shields.io/coveralls/marko-js/webpack.svg" alt="Test Coverage"/>
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

A Marko plugin and loader for Webpack

# Installation

[![Greenkeeper badge](https://badges.greenkeeper.io/marko-js/webpack.svg)](https://greenkeeper.io/)

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
      }
    ],
    plugins: [markoPlugin.browser]
  }
];
```

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
