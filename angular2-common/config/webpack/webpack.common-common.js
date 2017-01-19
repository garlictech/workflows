var path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const coreConfig = require('./webpack.core');

const isProd = process.env.npm_lifecycle_event === 'build';

const htmlWebpackEntry = {
  template: path.join(helpers.contentBase(), 'index.html'),
  favicon: path.join(helpers.contentBase(), 'favicon.ico')
};

module.exports = webpackMerge(coreConfig, {
  module: {
    rules: [{
        enforce: 'pre',
        test: /^((?!(ngfactory|shim)).)*ts$/,
        loader: 'tslint-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: helpers.contentBase()
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
          // loader: 'url-loader?limit=5000&name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.appCssPaths(),
        loader: ExtractTextPlugin
          .extract({
            fallbackLoader: "style-loader",
            loader: ['css-loader' + (isProd ? '?minimize' : '')]
              // loader: ['css-loader' + (isProd ? '?minimize' : ''), 'postcss-loader']
          })
      },
      {
        test: /\.css$/,
        include: helpers.appCssPaths(),
        // loader: 'raw-loader!postcss-loader'
        loader: 'raw-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.coffee$/,
        loader: 'coffee-loader'
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendorDll', 'vendor', 'app', 'style', 'polyfills']
    }),

    new HtmlWebpackPlugin(htmlWebpackEntry),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('postcss-cssnext')],
        tslint: {
          emitError: false,
          failOnHint: false
        }
      }
    })
  ]
});