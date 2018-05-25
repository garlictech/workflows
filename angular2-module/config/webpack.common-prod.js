/**
 * @author: @AngularClass
 */
"use strict";
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const coreConfig = require('./webpack.core.js');
const projectPJson = require('../package_project.json');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
    const isProd = options.env === 'production';

    var _config = webpackMerge(coreConfig(options), {
        cache: false,
        mode: "production",

        entry: {
            "main": helpers.srcRoot(),
            "main.min": helpers.srcRoot()
        },

        resolve: {
            extensions: ['.ts', '.js', '.json', '.pug', '.scss', '.css'],
            // An array of directory names to be resolved to the current directory
            modules: [helpers.srcRoot('src'), helpers.root('node_modules')],
        },

        module: {
            rules: [{
                    test: /\.ts$/,
                    use: [{
                            loader: '@angularclass/hmr-loader',
                            options: {
                                pretty: !isProd,
                                prod: isProd
                            }
                        },
                        {
                            loader: 'ng-router-loader',
                            options: {
                                loader: 'async-import',
                                genDir: 'compiled',
                                aot: AOT
                            }
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: helpers.root('tsconfig.webpack.json'),
                                declaration: false
                            }
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
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
            ],

        },

        plugins: [
            new AssetsPlugin({
                path: helpers.distRoot(),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            new CheckerPlugin(),

            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
             * See: https://github.com/angular/angular/issues/11580
             */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.root('src'), // location of your src
                {
                    // your Angular Async Route paths relative to this root directory
                }
            ),
            new LoaderOptionsPlugin({
                options: {
                    sassLoader: {
                        includePaths: [
                            helpers.root('node_modules', 'normalize-scss', 'sass'),
                            helpers.root('node_modules', 'compass-mixins', 'lib', 'compass')
                        ]
                    },
                }
            }),

            // Fix Angular 2
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)async/,
                helpers.root('node_modules/@angular/core/src/facade/async.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)collection/,
                helpers.root('node_modules/@angular/core/src/facade/collection.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)errors/,
                helpers.root('node_modules/@angular/core/src/facade/errors.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)lang/,
                helpers.root('node_modules/@angular/core/src/facade/lang.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)math/,
                helpers.root('node_modules/@angular/core/src/facade/math.js')
            ),
            new ngcWebpack.NgcWebpackPlugin({
                disabled: !AOT,
                tsConfig: helpers.root('tsconfig.webpack.json'),
                resourceOverride: helpers.root('config/resource-override.js')
            }),

            new CopyWebpackPlugin([{
                from: helpers.srcRoot('assets'),
                to: helpers.distRoot('assets')
            }]),
        ],
    });

    return _config;
};