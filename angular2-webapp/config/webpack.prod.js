'use strict';
const fs = require('fs');

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(
    commonConfig({
        env: ENV
    }).metadata, {
        host: HOST,
        port: PORT,
        ENV: ENV,
        HMR: false
    }
);

module.exports = function(env) {
    var _config = webpackMerge(
        commonConfig({
            env: ENV
        }), {
            devtool: 'source-map',

            module: {
                rules: [{
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'postcss-loader?sourceMap']
                        }),
                        include: [helpers.projectRoot('src', 'app', 'styles')]
                    },
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'postcss-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
                        }),
                        include: [helpers.projectRoot('src', 'app', 'styles')]
                    }
                ]
            },
            plugins: [
                new webpack.ContextReplacementPlugin(
                    // The (\\|\/) piece accounts for path separators in *nix and Windows
                    /angular(\\|\/)core(\\|\/)@angular/,
                    helpers.root('./src'), // location of your src
                    {} // a map of your routes
                ),
                new OptimizeJsPlugin({
                    sourceMap: false
                }),
                new ExtractTextPlugin('[name].[contenthash].css'),
                new DefinePlugin({
                    ENV: JSON.stringify(METADATA.ENV),
                    HMR: METADATA.HMR,
                    'process.env': {
                        ENV: JSON.stringify(METADATA.ENV),
                        NODE_ENV: JSON.stringify(METADATA.ENV),
                        HMR: METADATA.HMR
                    }
                }),
                // new webpack.optimize.UglifyJsPlugin({
                //     beautify: false,
                //     comments: false,
                //     mangle: {
                //         keep_fnames: true,
                //         screw_i8: true
                //     },
                //     compress: {
                //         screw_ie8: true,
                //         warnings: false,
                //         conditionals: true,
                //         unused: true,
                //         comparisons: true,
                //         sequences: true,
                //         dead_code: true,
                //         evaluate: true,
                //         if_return: true,
                //         join_vars: true
                //     }
                // }),
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
                        }
                    }
                }),
                new PurifyPlugin()
            ]
        }
    );

    if (fs.existsSync(helpers.prodHookFile())) {
        require(helpers.prodHookFile())(_config);
    }

    return _config;
};