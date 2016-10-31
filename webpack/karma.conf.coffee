webpackConfig = require('./webpack/config') __dirname
require('./project/hooks/webpack') webpackConfig

karmaConfig = require('./webpack/karma') __dirname, webpackConfig
require('./project/hooks/karma') karmaConfig

module.exports = (config) ->
  config.set karmaConfig
  return config
