/**
 * @author: @AngularClass
 */
var fs = require('fs');
const helpers = require('./helpers');

module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

    var configuration = {
        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',
        /*
         * Frameworks to use
         *
         * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ['jasmine'],
        exclude: [],
        client: {
            captureConsole: false
        }, // list of files to exclude
        /*
         * list of files / patterns to load in the browser
         *
         * we are building the test environment in ./spec-bundle.js
         */
        files: [{ pattern: './config/spec-bundle.js', watched: false }], // { pattern: helpers.siteRoot('assets', '**', '*'), watched: false, included: false, served: true, nocache: false }
        /*
         * By default all assets are served at http://localhost:[PORT]/base/
         */
        proxies: {
            '/assets/': '/base/src/assets/'
        },
        /*
         * preprocess matching files before serving them to the browser
         * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
         */
        preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
        webpack: testWebpackConfig,
        coverageReporter: { type: 'in-memory' },
        remapCoverageReporter: {
            'text-summary': null,
            json: helpers.projectRoot('reports', 'coverage', 'coverage.json'),
            html: helpers.projectRoot('reports', 'coverage', 'html')
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration // Webpack Config at ./webpack.test.js // Webpack please don't spam the console when running in karma!
            // i.e.
            noInfo: true,
            stats: {
                // options i.e. // and use stats to turn off verbose output
                chunks: false
            }
        },
        /*
         * test results reporter to use
         *
         * possible values: 'dots', 'progress'
         * available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ['mocha', 'coverage', 'remap-coverage'],
        port: 9876,
        colors: true, // web server port // enable / disable colors in the output (reporters and logs)
        /*
         * level of logging
         * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,
        autoWatch: false, // enable / disable watching file and executing tests whenever any file changes
        /*
         * start these browsers
         * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        customLaunchers: {
            ChromeCustom: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-translate', '--disable-extensions', '--remote-debugging-port=9876']
            }
        },
        browsers: ['ChromeCustom'],
        singleRun: true,
        concurrency: Infinity
    };

    if (fs.existsSync(helpers.karmaHookFile())) {
        require(helpers.karmaHookFile())(configuration);
    }

    config.set(configuration);
};