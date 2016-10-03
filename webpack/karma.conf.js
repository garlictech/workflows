var webpackConfig = require('webpack/config')(__dirname);
require('./hooks/webpack')(webpackConfig);

var karmaConfig = require('webpack/karma')(__dirname, webpackConfig);
require('./hooks/karma')(karmaConfig);

module.exports = karmaConfig;
