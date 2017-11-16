'use strict';
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
// const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

const helpers = require('./helpers');
const coreConfig = require('./webpack.core.js');
const AOT = helpers.hasNpmFlag('aot');

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
            main: AOT ? helpers.siteRoot('main.browser.aot.ts') : helpers.siteRoot('main.browser.ts')
        },

        output: {
            path: helpers.projectRoot('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
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
                                aot: AOT
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
            ]
        },

        plugins: [
            new AssetsPlugin({
                path: helpers.projectRoot('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new CheckerPlugin(),
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            // This enables tree shaking of the vendor modules
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules/.test(module.resource)
            }),
            // Specify the correct order the scripts will be injected in
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new CommonsChunkPlugin({
                name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
                minChunks: Infinity
            }),
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.root('src'), // location of your src
                {
                    // your Angular Async Route paths relative to this root directory
                }
            ),
            new CopyWebpackPlugin([{ from: helpers.siteRoot('assets'), to: 'assets' }, { from: helpers.siteRoot('meta') }]),
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
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
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

            // // Fix Angular 2
            // new NormalModuleReplacementPlugin(
            //     /facade(\\|\/)async/,
            //     helpers.root('node_modules/@angular/core/src/facade/async.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //     /facade(\\|\/)collection/,
            //     helpers.root('node_modules/@angular/core/src/facade/collection.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //     /facade(\\|\/)errors/,
            //     helpers.root('node_modules/@angular/core/src/facade/errors.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //     /facade(\\|\/)lang/,
            //     helpers.root('node_modules/@angular/core/src/facade/lang.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //     /facade(\\|\/)math/,
            //     helpers.root('node_modules/@angular/core/src/facade/math.js')
            // ),
        ],
        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false,
            fs: 'empty'
        }
    });

    return _config;
};