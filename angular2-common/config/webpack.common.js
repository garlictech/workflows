'use strict';
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpers = require('./helpers');
const coreConfig = require('./webpack.core.js');

const METADATA = {
    title: 'Angular2 Webpack Starter GarlicTech',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
    const isProd = options.env === 'production';

    var _config = webpackMerge(coreConfig(options), {
        entry: {
            main: helpers.siteRoot('main.browser.ts')
        },

        output: {
            path: helpers.projectRoot('dist'),
            filename: 'index.js'
        },

        resolve: {
            extensions: ['.ts', '.js', '.json', '.pug', '.scss', '.css'],
            modules: [helpers.projectRoot('src'), helpers.root('node_modules')]
        },

        module: {
            rules: [{
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.html$/,
                    use: 'html-loader',
                    exclude: [helpers.siteRoot('index.html')]
                },
                {
                    test: /\.(jade|pug)$/,
                    loader: 'pug-ng-html-loader'
                }
            ]
        },

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        },

        plugins: [
            new AssetsPlugin({
                path: helpers.projectRoot('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new CopyWebpackPlugin([{
                from: helpers.siteRoot('assets'),
                to: 'assets'
            }, {
                from: helpers.siteRoot('meta')
            }]),
            new HtmlWebpackPlugin({
                template: helpers.siteRoot('index.html'),
                chunksSortMode: 'dependency',
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new LoaderOptionsPlugin({
                options: {
                    sassLoader: {
                        includePaths: [
                            helpers.root('node_modules', 'normalize-scss', 'sass'),
                            helpers.root('node_modules', 'compass-mixins', 'lib', 'compass')
                        ]
                    }
                }
            })
        ]
    });

    return _config;
};