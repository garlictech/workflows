'use strict';
const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const webpackMerge = require('webpack-merge');

const coreConfig = require('./webpack.core.js');
const ENV = (process.env.ENV = process.env.NODE_ENV = 'test');

module.exports = function() {
    var _config = webpackMerge(coreConfig({ env: ENV }), {
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [helpers.projectRoot('src'), 'node_modules']
        },

        module: {
            rules: [
                /**
                 * Source map loader support for *.js files
                 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
                 *
                 * See: https://github.com/webpack/source-map-loader
                 */
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: [
                        // these packages have problems with their sourcemaps
                        helpers.root('node_modules/rxjs'),
                        helpers.root('node_modules/@angular')
                    ]
                },

                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 */
                {
                    test: /\.ts$/,
                    use: [{
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.test.json'
                            }
                        },
                        'angular2-template-loader'
                    ],
                    exclude: [/\.e2e\.ts$/]
                },

                /**
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [helpers.siteRoot('index.html')]
                },

                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.siteRoot('index.html')]
                },
                {
                    test: /\.(jade|pug)$/,
                    loader: 'pug-ng-html-loader'
                },
                /*
                 * css loader support for *.css files (styles directory only)
                 * Loads external css styles into the DOM, supports HMR
                 *
                 */
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                },
                /* scss loader support for *.scss files (styles directory only)
                 * Loads external scss styles into the DOM, supports HMR
                 *
                 */
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                },
                /**
                 * Instruments JS files with Istanbul for subsequent code coverage reporting.
                 * Instrument only testing sources.
                 *
                 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
                 */
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    include: helpers.projectRoot('src'),
                    exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
                }
            ]
        },

        plugins: [
            new DefinePlugin({
                ENV: JSON.stringify(ENV),
                HMR: false,
                'process.env': {
                    ENV: JSON.stringify(ENV),
                    NODE_ENV: JSON.stringify(ENV),
                    HMR: false
                }
            }),

            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.projectRoot('src'), // location of your src
                {
                    // your Angular Async Route paths relative to this root directory
                }
            ),

            new LoaderOptionsPlugin({
                debug: false,
                options: {
                    // legacy options go here
                }
            })
        ],

        performance: {
            hints: false
        }
    });

    return _config;
};