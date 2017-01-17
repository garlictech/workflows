"use strict";
const webpackMerge = require('webpack-merge');

const commonCommonConfig = require('./webpack.common-common.js');

const entry = {
  'polyfills': 'project/dev-site/dll/polyfills.ts',
  'vendor': './project/dev-site/dll/vendor.dll.ts',
  'app': 'project/dev-site/main.ts',
  'style': 'project/src/app/styles/index.ts'
};

var config = webpackMerge(commonCommonConfig, {
  entry: entry
});

module.exports = config;