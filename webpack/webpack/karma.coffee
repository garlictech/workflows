webpack = require 'webpack'
plugins = require('webpack-load-plugins')()

IsDev = process.env.NODE_ENV is 'development'

module.exports = (dirname, webpackConfig) ->
  packageConfig = require('./package-config') dirname
  
  # The statically settable properties. We set more properties programmatically after that
  karmaConfig =
    files: [
      packageConfig.unittest
      packageConfig.main
    ]

    watched: IsDev
    included: true
    served: true
    singleRun: not IsDev

    preprocessors: {}
    
    webpack: webpackConfig

    webpackMiddleware:
      stats:
        colors: true

    autoWatch : true
    colors: true
    logLevel: "debug"
    frameworks: ['mocha', 'sinon-chai']
    browsers: ['PhantomJS_custom']
    captureTimeout: 60000
    reportSlowerThan: 500

    customLaunchers:
      'PhantomJS_custom':
        base: 'PhantomJS'
        options:
          windowName: 'my-window'
          settings:
            webSecurityEnabled: false
        flags: ['--load-images=true']

    phantomjsLauncher:
      exitOnResourceError: true

    plugins : [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon-chai',
      'karma-webpack'
      # 'karma-coverage'
    ]

    reporters: ['mocha']
    # reporters: ['mocha', 'coverage']

    client:
      chai:
        includeStack: true

  karmaConfig.webpack.plugins.push new webpack.ProvidePlugin
    UnitTest: '/app/test/unit/unit-test-base.coffee'

  karmaConfig.preprocessors[packageConfig.main] = ['webpack']
  karmaConfig.preprocessors[packageConfig.unittest] = ['webpack']

  return karmaConfig
