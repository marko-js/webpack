# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.0.1](https://github.com/marko-js/webpack/compare/v5.0.0...v5.0.1) (2020-03-17)


### Bug Fixes

* automatically configure webpack options when runtimeid set ([#35](https://github.com/marko-js/webpack/issues/35)) ([f5a620e](https://github.com/marko-js/webpack/commit/f5a620e1021ddb386d919eb08371f24cca8aba84))

## [5.0.0](https://github.com/marko-js/webpack/compare/v4.3.0...v5.0.0) (2020-03-16)


### ⚠ BREAKING CHANGES

* Webpack now controls async script order.

### Features

* load scripts via async script tag ([#34](https://github.com/marko-js/webpack/issues/34)) ([3feb008](https://github.com/marko-js/webpack/commit/3feb008ff85e31cf4c866cbfbd5858606ad67b9c))

## [4.3.0](https://github.com/marko-js/webpack/compare/v4.2.0...v4.3.0) (2020-03-15)


### Features

* skip writing dynamic publicPath if publicPath is in output options ([#31](https://github.com/marko-js/webpack/issues/31)) ([6d117c9](https://github.com/marko-js/webpack/commit/6d117c905f3176ff89f990da28b3f303c43b05ed))


### Bug Fixes

* include runtimeId in dynamic public path var ([#32](https://github.com/marko-js/webpack/issues/32)) ([d6751af](https://github.com/marko-js/webpack/commit/d6751afce3349078e93e70a7f0461855ca56660f))

## [4.2.0](https://github.com/marko-js/webpack/compare/v4.1.3...v4.2.0) (2020-03-14)


### Features

* add runtimeid option ([#30](https://github.com/marko-js/webpack/issues/30)) ([4947ed6](https://github.com/marko-js/webpack/commit/4947ed651867887b0ce3aff81499ef57d29bdfbe))

### [4.1.3](https://github.com/marko-js/webpack/compare/v4.1.2...v4.1.3) (2020-03-11)


### Bug Fixes

* babelConfig typo in README ([701b1e4](https://github.com/marko-js/webpack/commit/701b1e4072c88e6916b88d31ae715ad6d36df4fe))
* do not load browser.json files by default ([0fa09f5](https://github.com/marko-js/webpack/commit/0fa09f53fb30f58fbf925b1b23e36a7df420a1f4))

### [4.1.2](https://github.com/marko-js/webpack/compare/v4.1.1...v4.1.2) (2020-03-03)


### Bug Fixes

* use cjs for Marko 4 and esm for 5 ([#28](https://github.com/marko-js/webpack/issues/28)) ([ea0bbde](https://github.com/marko-js/webpack/commit/ea0bbdeb22e6359fbaf2f440d68654241b16275c))

### [4.1.1](https://github.com/marko-js/webpack/compare/v4.1.0...v4.1.1) (2020-02-28)


### Bug Fixes

* provide name option to babel caller config ([266af4d](https://github.com/marko-js/webpack/commit/266af4d96b3ca0d0625e2c5a441297a504956038))

## [4.1.0](https://github.com/marko-js/webpack/compare/v4.0.0...v4.1.0) (2020-02-27)


### Features

* expose babelOptions for Marko 5 compiler ([#25](https://github.com/marko-js/webpack/issues/25)) ([fb49fa9](https://github.com/marko-js/webpack/commit/fb49fa9511ef35d5cc52754126dd730d0ccbc5d4))
* switch output from loader to use es modules ([#26](https://github.com/marko-js/webpack/issues/26)) ([8aadc82](https://github.com/marko-js/webpack/commit/8aadc82f8d49510d81dfc2f7fc8704bbf5055e4f))

## [4.0.0](https://github.com/marko-js/webpack/compare/v3.0.0...v4.0.0) (2020-02-24)


### ⚠ BREAKING CHANGES

* The getClientCompilerName API has been removed.

### Features

* dynamic builds now use $global.buildName ([46b204e](https://github.com/marko-js/webpack/commit/46b204e158678714ae80ae1b39fab3af588c579e))


### Bug Fixes

* eslint path ([ea77337](https://github.com/marko-js/webpack/commit/ea77337de3c027b85994743cb1fa4bbd4f20072b))

## [3.0.0](https://github.com/marko-js/webpack/compare/v2.1.0...v3.0.0) (2020-02-20)


### ⚠ BREAKING CHANGES

* Marko 4.18.47 or higher is now required.

### Features

* support out.global.cspNonce for script tags ([8b55a74](https://github.com/marko-js/webpack/commit/8b55a742aab55d091cf5bacbf659d8daf47b71a9))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
