/**
 * @author: @AngularClass
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const dts = require('dts-bundle');

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common-prod'); // the settings that are common to prod and dev
const projectPJson = require('../package_project.json');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

const LIBNAME = projectPJson.name.replace('@', '').replace('/', '-')

module.exports = function(env) {
  "use strict";
  var _config = webpackMerge(commonConfig({
    env: ENV
  }), {
    devtool: 'source-map',

    output: {
      path: helpers.distRoot(),
      filename: '[name].bundle.js',
      library: LIBNAME,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      sourceMapFilename: '[name].bundle.map'
    },

    module: {
      rules: [{
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader'
          }),
          include: [helpers.srcRoot('styles')]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader!sass-loader'
          }),
          include: [helpers.srcRoot('styles')]
        },
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].[contenthash].css'),

      new NormalModuleReplacementPlugin(
        /angular2-hmr/,
        helpers.root('config/empty.js')
      ),

      new NormalModuleReplacementPlugin(
        /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        helpers.root('config/empty.js')
      ),

      new LoaderOptionsPlugin({
        // minimize: true,
        minimize: false,
        debug: false,
        options: {
          htmlLoader: {
            // minimize: true,
            minimize: false,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
          },

        }
      }),
      new UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        include: /\.min.bundle\.js$/,
      }),
    ],

    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });

  if (fs.existsSync(helpers.prodHookFile())) {
    require(helpers.prodHookFile())(_config);
  }

  return _config;
}