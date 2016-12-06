const helpers = require('./helpers');

module.exports = function(config, webpackConfig) {

  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [{
      pattern: './config/test/karma-test-shim.js',
      watched: false
    }],

    preprocessors: {
      './config/test/karma-test-shim.js': ['coverage', 'webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      'json': './coverage/coverage.json',
      'html': './coverage/html',
      'lcovonly': './coverage/lcov.info'
    },

    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !helpers.isCi(),
    browsers: ['PhantomJS'],
    singleRun: helpers.isCi()
  };

  return _config;
};
