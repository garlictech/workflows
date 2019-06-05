const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: 'tsconfig.json'
    })]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'artifacts', '.webpack'),
    filename: '[name].js'
  },
  mode: 'development',
  target: 'node',
  externals: [
    /aws-sdk/,
  ],
  module: {
    rules: [
      {
        test: /^.*\.ts$/,
        exclude: /^.*\.spec\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'project/config/tsconfig.app.json',
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
};