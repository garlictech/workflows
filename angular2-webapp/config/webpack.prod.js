'use strict';
const fs = require('fs');

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV || 'production';
const BRANCH = process.env.TRAVIS_BRANCH || process.env.BRANCH || 'staging';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;
const HMR = false;

const ENVDATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR,
    BRANCH: BRANCH
};

const METADATA = webpackMerge(commonConfig(ENVDATA).metadata, ENVDATA);

function getUglifyOptions(supportES2015, enableCompress) {
    const uglifyCompressOptions = {
        pure_getters: true,
        /* buildOptimizer */
        // PURE comments work best with 3 passes.
        // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
        passes: 2 /* buildOptimizer */
    };

    return {
        ecma: supportES2015 ? 6 : 5,
        warnings: false, // TODO verbose based on option?
        ie8: false,
        mangle: true,
        compress: enableCompress ? uglifyCompressOptions : false,
        output: {
            ascii_only: true,
            comments: false
        }
    };
}

module.exports = function(env) {
    var _config = webpackMerge(commonConfig(ENVDATA), {
        devtool: 'source-map',
        mode: "production",
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
            new OptimizeJsPlugin({
                // location of your src // a map of your routes
                sourceMap: true
            }),
            new SourceMapDevToolPlugin({
                filename: '[file].map[query]',
                moduleFilenameTemplate: '[resource-path]',
                fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
                sourceRoot: 'webpack:///'
            }),
            new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
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
            new PurifyPlugin(),
            new HashedModuleIdsPlugin(),
            new ModuleConcatenationPlugin(),
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                cache: helpers.root('webpack-cache/uglify-cache'),
                uglifyOptions: getUglifyOptions(true, true)
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
        ]
    });

    if (fs.existsSync(helpers.prodHookFile())) {
        require(helpers.prodHookFile())(_config);
    }

    return _config;
};