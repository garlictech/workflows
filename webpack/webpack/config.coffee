_ = require 'lodash'
fs = require 'fs'
path = require 'path'
webpack = require 'webpack'
plugins = require('webpack-load-plugins') {config: '/app/package_internal.json'}

module.exports = (dirname) ->
  commonConfig = (require './common') dirname
  packageConfig = commonConfig.packageConfig
  
  conf = _.assign commonConfig,
    entry:
      release: './src/'
      devapp: './dev-site/dev-app'
    output:
      path: commonConfig.PATHS.dist
      filename: "#{packageConfig.moduleName}.[name].bundle.js"
      sourceMapFilename: "[file].map"
      chunkFilename: '[id].bundle.js'

    cache: true

    devServer:
      contentBase: packageConfig.contentBase
      content: "index.html"
      modules: true
      reasons: true
      errorDetails: true
      hot: true
      colors: true
      port: process.env.npm_package_config_port or 8081
      host: '0.0.0.0'
      watchOptions:
        poll: 1000

  # if not packageConfig.commonChunksDisabled
  #   conf.entry[packageConfig.commonsName] = packageConfig.commons
  #   conf.plugins.push new webpack.optimize.CommonsChunkPlugin packageConfig.commonsName, packageConfig.commonsBundleName

  return conf
