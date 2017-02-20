"use strict";

const helpers = require('./helpers');

module.exports = function(options) {
  var isProd = options.env === 'production';

  return {
    module: {

      rules: [
        /*
         * to string and css loader support for *.css files (from Angular components)
         * Returns file content as string
         *
         */
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          // loader: 'file-loader?name=assets/[name].[hash].[ext]'
          loader: 'url-loader?limit=5000&name=assets/[name].[hash].[ext]'
        },
        /*
         * to string and sass loader support for *.scss files (from Angular components)
         * Returns compiled css content as string
         *
         */
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.projectRoot('src', 'app', 'styles')]
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [helpers.projectRoot('src', 'app', 'styles')]
        },
      ]
    }
  };
};