const webpackMerge = require('webpack-merge');
const fs = require('fs');
const helpers = require('./helpers');

const coreConfig = require('./webpack.core');

var config = webpackMerge(coreConfig, {
  entry: "dummy",
  devtool: 'inline-source-map',

  module: {
    rules: [{
        test: /\.(js|ts)$/,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          module: 'commonjs',
          sourceMap: false,
          inlineSourceMap: true,
          forkChecker: true
        }
      },
      {
        test: /\.ts$/,
        loader: 'angular2-template-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  }
});

if (fs.existsSync(helpers.testHookFile())) {
  require(helpers.testHookFile())(config);
}

module.exports = config;