const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const coreConfig = require('./webpack.core');

const isProd = process.env.npm_lifecycle_event === 'build';

const entry = {
  'polyfills': './project/src/dll/polyfills.ts',
  'style': './project/src/app/styles/index.ts',
  'vendor': './project/src/dll/vendor.dll.ts',
  'app': './project/src/main.ts'
};

module.exports = webpackMerge(coreConfig, {
  entry: entry,

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
        exclude: helpers.root('src', 'public')
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin
          .extract({
            fallbackLoader: "style-loader",
            loader: ['css-loader' + (isProd ? '?minimize' : ''), 'postcss-loader']
          })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.coffee$/,
        loader: 'coffee'
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendorDll', 'vendor', 'app', 'style', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      favicon: 'project/src/public/favicon.ico',
      template: 'project/src/public/index.html'
    }),

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
