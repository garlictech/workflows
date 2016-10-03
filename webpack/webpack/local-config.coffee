webpack = require 'webpack'

module.exports = (config) ->
  config.plugins.push new webpack.ProvidePlugin
    config: "config.json"
