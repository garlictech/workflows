const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry: {
        server: './universal/server.ts',
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        minimize: false
    },
    output: {
        // Puts the output at the root of the dist folder
        path: path.join(__dirname, 'artifacts', 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'src/tsconfig.json'
                }
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
                parser: {
                    system: true
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'), {}
        )
    ]
}