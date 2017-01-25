"use strict";
const fs = require('fs');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');
const devCommonConfig = require('./webpack.dev-common.js');

var config = webpackMerge(devCommonConfig, {});

if (fs.existsSync(helpers.devHookFile())) {
  require(helpers.devHookFile())(config);
}

module.exports = config;