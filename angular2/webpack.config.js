webpackConfig = require('./webpack/webpack.dev')({ env: 'development' });
require('./project/hooks/webpack')(webpackConfig);
module.exports = webpackConfig;
