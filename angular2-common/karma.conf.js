// "use strict";
// const fs = require('fs');
// var webpackConfig = require('./config/webpack/webpack.test');
// const helpers = require('./config/webpack/helpers');

// module.exports = function(config) {
//   var karmaConfig = require('./config/karma.conf')(config, webpackConfig);

//   if (fs.existsSync(helpers.karmaHookFile())) {
//     require(helpers.karmaHookFile())(config);
//   }

//   config.set(karmaConfig);
//   return config;
// }

/**
 * @author: @AngularClass
 */

// Look in ./config for karma.conf.js
module.exports = require('./config/karma.conf.js');