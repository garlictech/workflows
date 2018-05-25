'use strict';
const fs = require('fs');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const helpers = require('./helpers');
webpackMerge.strategy({
    plugins: 'replace'
});
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV || 'development';
const BRANCH = process.env.TRAVIS_BRANCH || process.env.BRANCH || 'staging';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8081;
const HMR = true;

const ENVDATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR,
    BRANCH: BRANCH
};

const METADATA = webpackMerge(commonConfig(ENVDATA).metadata, ENVDATA);

module.exports = function() {
    var _config = webpackMerge(commonConfig(ENVDATA), {
        devtool: 'cheap-module-source-map',
        mode: "development",
        module: {
            rules: [{
                    test: /\.ts$/,
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            configFile: 'tslint.json'
                        }
                    }],
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
            new LoaderOptionsPlugin({
                debug: true,
                options: {}
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            contentBase: '/app/project/src',
            hot: true
        }
    });

    if (fs.existsSync(helpers.devHookFile())) {
        require(helpers.devHookFile())(_config);
    }

    return _config;
};