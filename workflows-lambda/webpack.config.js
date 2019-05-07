const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'artifacts', '.webpack'),
        filename: '[name].js'
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [{
            test: /^.*\.ts$/,
            exclude: /^.*\.spec\.ts$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: 'project/tsconfig.app.json'
                }
            }]
        }]
    }
};