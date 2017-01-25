"use strict";
const fs = require('fs');
var webpackConfig = require('./config/webpack/webpack.test');
const helpers = require('./config/webpack/helpers');

module.exports = function(config) {
  var karmaConfig = require('./config/webpack/karma')(config, webpackConfig);

  if (fs.existsSync(helpers.karmaHookFile())) {
    require(helpers.karmaHookFile())(config);
  }

  config.set(karmaConfig);
  return config;
}