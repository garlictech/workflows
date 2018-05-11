'use strict';

const path = require('path');

const globalConfig = {
    baseUrl: process.env.WEBSERVER_IP + ':' + process.env.WEBSERVER_PORT
};

exports.config = {
    baseUrl: globalConfig.baseUrl,
    allScriptsTimeout: 7 * 60 * 10000,
    specs: ["./src/features/**/*.feature"],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                "--headless",
                "--disable-gpu"
            ],
        },
    },
    framework: 'custom',
    getPageTimeout: 140000,
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['dist/**/*.js']
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    onPrepare: function() {
        const globals = require('protractor');
        const browser = globals.browser;
        //   global.baseUrl = globalConfig.baseUrl;
        // browser.ignoreSynchronization = true;
        // var chai, chaiAsPromised;
        global.EC = protractor.ExpectedConditions;
        global.PTR = browser;
        global.config = globalConfig;
        // chai = require('chai');
        // chaiAsPromised = require('chai-as-promised');
        // chai.use(chaiAsPromised);
        // global.chai = chai;
        // global.expect = chai.expect;
        // return global.should = chai.should();
    }
};


// 'use strict';

// const path = require('path');
// var paths = require('./paths');

// const globalConfig = {
//   baseUrl: process.env.WEBSERVER_IP + ':' + process.env.SERVER_PORT
// };

// exports.config = {
//     baseUrl: globalConfig.baseUrl,
//     allScriptsTimeout: 7 * 60 * 10000,
//     specs: [paths.features],
//     capabilities: {
//       browserName: 'chrome',
//       chromeOptions: {
//         args: [
//           "--headless",
//           "--disable-gpu"
//         ],
//       },
//     },
//     framework: 'custom',
//     getPageTimeout: 140000,
//     frameworkPath: 'protractor-cucumber-framework'),
//   cucumberOpts: {
//     require: [paths.distFiles, paths.support],
//     format: "json"
//   },
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000
//   },
//   onPrepare: function () {
//     //   const globals = require('protractor');
//     const browser = globals.browser;
//     //   global.baseUrl = globalConfig.baseUrl;
//     browser.ignoreSynchronization = true;
//     var chai, chaiAsPromised;
//     global.EC = protractor.ExpectedConditions;
//     global.PTR = browser;
//     global.config = globalConfig;
//     chai = require('chai');
//     chaiAsPromised = require('chai-as-promised');
//     chai.use(chaiAsPromised);
//     global.chai = chai;
//     global.expect = chai.expect;
//     return global.should = chai.should();
//   }
// };