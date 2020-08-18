# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [6.2.9](https://github.com/marko-js/webpack/compare/v6.2.8...v6.2.9) (2020-08-18)


### Bug Fixes

* issue with regexp chars in multi file component files ([64224c3](https://github.com/marko-js/webpack/commit/64224c3622f8ae58d64809329a2eea728f6568fa))

### [6.2.8](https://github.com/marko-js/webpack/compare/v6.2.7...v6.2.8) (2020-08-10)


### Bug Fixes

* webpack incorrectly merging expressions in prod ([61e4f76](https://github.com/marko-js/webpack/commit/61e4f76ad34be2094ad912356ab2c9736b0c3e84))

### [6.2.7](https://github.com/marko-js/webpack/compare/v6.2.6...v6.2.7) (2020-08-10)


### Bug Fixes

* issue with returning sourcemap for empty code ([2f8473a](https://github.com/marko-js/webpack/commit/2f8473a2498496a4f197e061d5e20e2d53f341ee))

### [6.2.6](https://github.com/marko-js/webpack/compare/v6.2.5...v6.2.6) (2020-08-10)


### Bug Fixes

* not reloading on adding style/component files ([c0c3b25](https://github.com/marko-js/webpack/commit/c0c3b258e7c0647034453ea85d412a418682d7b6))

### [6.2.5](https://github.com/marko-js/webpack/compare/v6.2.4...v6.2.5) (2020-08-07)


### Bug Fixes

* avoid writing unchanged virtual modules to disk ([ab30570](https://github.com/marko-js/webpack/commit/ab3057041acd66e38dd722fcbb2519429ed73c35))

### [6.2.4](https://github.com/marko-js/webpack/compare/v6.2.3...v6.2.4) (2020-08-07)


### Bug Fixes

* issue with client entries disappearing when assets cached ([ce6b138](https://github.com/marko-js/webpack/commit/ce6b138a2c36f71f58cfa332a3afaed669d5a48a))

### [6.2.3](https://github.com/marko-js/webpack/compare/v6.2.2...v6.2.3) (2020-08-06)

### [6.2.2](https://github.com/marko-js/webpack/compare/v6.2.1...v6.2.2) (2020-08-06)


### Bug Fixes

* regression in watch mode ([8ca2ee1](https://github.com/marko-js/webpack/commit/8ca2ee14931f2e3fb1d6356c6b70a400e58ca244))

### [6.2.1](https://github.com/marko-js/webpack/compare/v6.2.0...v6.2.1) (2020-08-06)


### Bug Fixes

* refactor loader, fix issue with caching and watching missing files ([c1af31a](https://github.com/marko-js/webpack/commit/c1af31add6ccb37b7bedd1381a9cd5aa94816f96))

## [6.2.0](https://github.com/marko-js/webpack/compare/v6.1.3...v6.2.0) (2020-08-05)


### Features

* include watch dependencies output from Marko compiler ([9bc613d](https://github.com/marko-js/webpack/commit/9bc613dfec882b90fe6eada8c1fe9c3de3102cc1))

### [6.1.3](https://github.com/marko-js/webpack/compare/v6.1.2...v6.1.3) (2020-08-05)

### [6.1.2](https://github.com/marko-js/webpack/compare/v6.1.1...v6.1.2) (2020-08-04)

### [6.1.1](https://github.com/marko-js/webpack/compare/v6.1.0...v6.1.1) (2020-07-29)


### Bug Fixes

* revert asset export change which broke Marko 4 builds ([bcd8c0d](https://github.com/marko-js/webpack/commit/bcd8c0df9cdc916020d7ac53ab471654056fb5af))

## [6.1.0](https://github.com/marko-js/webpack/compare/v6.0.1...v6.1.0) (2020-07-29)


### Features

* expose template exports from top level asset wrappers ([be3e1c9](https://github.com/marko-js/webpack/commit/be3e1c924a99444f21292a6893befcb7463ccf96))

### [6.0.1](https://github.com/marko-js/webpack/compare/v6.0.0...v6.0.1) (2020-07-06)


### Bug Fixes

* head transformer append scripts inside for Marko 5 ([cd66494](https://github.com/marko-js/webpack/commit/cd664945f31a2159ffb246e0bd8f729cfc66bd5c))

## [6.0.0](https://github.com/marko-js/webpack/compare/v5.0.3...v6.0.0) (2020-04-27)


### ⚠ BREAKING CHANGES

* now requires at least marko@4.20

### Bug Fixes

* improve support for Marko 5, update semver range ([2cefd91](https://github.com/marko-js/webpack/commit/2cefd913243cacd61e45aa50b23ddca741cbe573))

### [5.0.3](https://github.com/marko-js/webpack/compare/v5.0.2...v5.0.3) (2020-03-19)


### Bug Fixes

* include component-globals and await-reorderer tags inn ssr code ([#37](https://github.com/marko-js/webpack/issues/37)) ([63f0ce5](https://github.com/marko-js/webpack/commit/63f0ce58485738c080b20a6dc4c74eb4984027e7))

### [5.0.2](https://github.com/marko-js/webpack/compare/v5.0.1...v5.0.2) (2020-03-17)


### Bug Fixes

* optimize component registration for top level stateful components ([#36](https://github.com/marko-js/webpack/issues/36)) ([4d1787b](https://github.com/marko-js/webpack/commit/4d1787be880d5ebbddf3c162926f5af65998c7f9))

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
