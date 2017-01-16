"use strict";
const webpackMerge = require('webpack-merge');

const commonCommonConfig = require('./webpack.common-common.js');

const entry = {
  'polyfills': '/app/project/dev-site/dll/polyfills.ts',
  'vendor': '/app/project/dev-site/dll/vendor.dll.ts',
  'app': '/app/project/dev-site/main.ts',
  'style': '/app/project/src/app/styles/index.ts'
};

var config = webpackMerge(commonCommonConfig, {
  entry: entry
});

module.exports = config;