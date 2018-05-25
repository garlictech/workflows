'use strict';
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
// const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
// const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');

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
            polyfills: helpers.siteRoot('polyfills.browser.ts'),
            main: helpers.siteRoot('main.browser.ts')
        },

        output: {
            path: helpers.projectRoot('dist'),
            filename: '[name].[hash].bundle.js',
            sourceMapFilename: '[name].[hash].bundle.map',
            chunkFilename: '[id].[hash].chunk.js'
        },

        resolve: {
            extensions: ['.ts', '.js', '.json', '.pug', '.scss', '.css'],
            modules: [helpers.projectRoot('src'), helpers.root('node_modules')]
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
                                aot: helpers.isAot()
                            }
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.webpack.json'
                            }
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [/\/test\/$/]
                        // exclude: [/\.(spec|e2e)\.ts$/]
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
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'polyfills',
            //     chunks: ['polyfills']
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     chunks: ['main'],
            //     minChunks: module => /node_modules/.test(module.resource)
            // }),
            // // Specify the correct order the scripts will be injected in
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['polyfills', 'vendor'].reverse()
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            //     minChunks: Infinity
            // }),
            // new CheckerPlugin(),
            // new ContextReplacementPlugin(
            //     // The (\\|\/) piece accounts for path separators in *nix and Windows
            //     /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            //     helpers.root('src'), // location of your src
            //     {
            //         // your Angular Async Route paths relative to this root directory
            //     }
            // ),
            new CopyWebpackPlugin([{
                from: helpers.siteRoot('assets'),
                to: 'assets'
            }, {
                from: helpers.siteRoot('meta')
            }]),
            new HtmlWebpackPlugin({
                template: helpers.siteRoot('index.html'),
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            // new HtmlElementsPlugin({
            //     headTags: require('./head-config.common')
            // }),
            new LoaderOptionsPlugin({
                options: {
                    sassLoader: {
                        includePaths: [
                            helpers.root('node_modules', 'normalize-scss', 'sass'),
                            helpers.root('node_modules', 'compass-mixins', 'lib', 'compass')
                        ]
                    }
                }
            }),
            new DefinePlugin({
                ENV: JSON.stringify(METADATA.ENV),
                NODE_ENV: JSON.stringify(METADATA.ENV),
                HMR: JSON.stringify(METADATA.HMR),
                BRANCH: JSON.stringify(METADATA.BRANCH),
                'process.env': {
                    ENV: JSON.stringify(METADATA.ENV),
                    NODE_ENV: JSON.stringify(METADATA.ENV),
                    HMR: JSON.stringify(METADATA.HMR),
                    BRANCH: JSON.stringify(METADATA.BRANCH)
                }
            }),
        ],
        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
    });

    return _config;
};