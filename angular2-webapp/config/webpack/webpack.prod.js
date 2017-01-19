const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ngtools = require('@ngtools/webpack');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  module: {
    rules: [{
      enforce: 'post',
      test: /\.ts$/,
      loaders: ['@ngtools/webpack'],
      exclude: [/\.(spec|e2e)\.ts$/]
    }]
  },

  entry: {
    'app': helpers.appEntrypointProd()
  },

  output: {
    path: helpers.systemRoot('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
    publicPath: '/',
  },

  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: '/app/tsconfig-aot.json',
      typeCheck: true,
      entryModule: `${helpers.appEntryBase()}/app.module#AppModule`
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('postcss-cssnext')],
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
    // new CopyWebpackPlugin([{
    //   from: path.join(helpers.contentBase(), 'images'),
    //   to: './images'
    // }])
  ]
});