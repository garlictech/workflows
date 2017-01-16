"use strict";
var webpackConfig = require('./config/webpack/webpack.test');
require('./project/hooks/webpack.test')(webpackConfig);

module.exports = function(config) {
  var karmaConfig = require('./config/webpack/karma')(config, webpackConfig);
  config.set(karmaConfig);
  return config;
}
