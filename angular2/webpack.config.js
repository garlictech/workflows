var webpackConfig = require('./config/webpack/webpack.dev.js');
require('./project/hooks/webpack')(webpackConfig);
module.exports = webpackConfig;
