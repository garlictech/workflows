'use strict';

const helpers = require('./helpers');

module.exports = function() {
    return {
        module: {
            rules: [{
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=5000&name=assets/[name].[hash].[ext]'
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        'to-string-loader',
                        'css-loader',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ],
                    exclude: [helpers.projectRoot('src', 'app', 'styles')]
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader', 'postcss-loader?sourceMap'],
                    exclude: [helpers.projectRoot('src', 'app', 'styles')]
                }
            ]
        }
    };
};