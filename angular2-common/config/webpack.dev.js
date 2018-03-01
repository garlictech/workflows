'use strict';
const fs = require('fs');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV || 'development';
const BRANCH = process.env.TRAVIS_BRANCH || process.env.BRANCH || 'staging';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8081;
const HMR = helpers.hasProcessFlag('hot');

const ENVDATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR,
    BRANCH: BRANCH
};

const METADATA = webpackMerge(commonConfig(ENVDATA).metadata, ENVDATA);

const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

module.exports = function() {
    var _config = webpackMerge(commonConfig(ENVDATA), {
        devtool: 'cheap-module-source-map',
        module: {
            rules: [{
                    test: /\.ts$/,
                    use: [{ loader: 'tslint-loader', options: { configFile: 'tslint.json' } }],
                    exclude: [/\.(spec|e2e)\.ts$/, helpers.root('node_modules')]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader?sourceMap'],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                }
            ]
        },
        plugins: [
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
            new LoaderOptionsPlugin({ debug: true, options: {} })
        ],
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: { aggregateTimeout: 300, poll: 1000 }
        }
    });

    if (fs.existsSync(helpers.devHookFile())) {
        require(helpers.devHookFile())(_config);
    }

    return _config;
};