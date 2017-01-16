"use strict";
const webpackMerge = require('webpack-merge');

const commonCommonConfig = require('./webpack.common-common.js');

const entry = {
  'polyfills': './project/src/dll/polyfills.ts',
  'vendor': './project/src/dll/vendor.dll.ts',
  'app': './project/src/main.ts',
  'style': './project/src/app/styles/index.ts'
};

var config = webpackMerge(commonCommonConfig, {
  entry: entry
});

module.exports = config;