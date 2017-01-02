const webpack = require('webpack');
const env = require('dotenv').config({ silent: true });
const _ = require('lodash');

const constants = require('./constants');
const helpers = require('./helpers');
const envMap = _.mapValues(env, v => JSON.stringify(v));
const ProgressBar = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.npm_lifecycle_event === 'build';

if (!envMap.APP_ENV) {
  envMap.APP_ENV = '"development"';
  console.log('APP_ENV is not set in your .env, it will default to "development"');
} else {
  console.log('APP_ENV is ' + envMap.APP_ENV);
}

var config = {
  resolve: {
    extensions: ['.js', '.ts', '.pug', '.jade', '.scss', '.css', '.json'],
    modules: ['app', 'src', 'node_modules']
  },
  module: {
    rules: [{
        test: /\.(jade|pug)$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.appCssPaths(),
        loader: ExtractTextPlugin
          .extract({
            fallbackLoader: "style-loader",
            loader: ['css-loader' + (isProd ? '?minimize' : ''), 'postcss-loader', 'sass-loader']
          })
      },
      {
        test: /\.scss$/,
        include: helpers.appCssPaths(),
        loader: 'raw-loader!postcss-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': envMap
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      constants.CONTEXT_REPLACE_REGEX,
      helpers.root('./src') // location of your src
    )
  ]
};

if (!helpers.isCi()) {
  config.plugins.push(new ProgressBar());
}

module.exports = config;
