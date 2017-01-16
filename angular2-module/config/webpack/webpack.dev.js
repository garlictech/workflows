"use strict";
const webpackMerge = require('webpack-merge');

const devCommonConfig = require('./webpack.dev-common.js');

var config = webpackMerge(devCommonConfig, {});

module.exports = config;