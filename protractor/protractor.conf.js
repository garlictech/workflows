'use strict';

const path = require('path');

const globalConfig = {
    baseUrl: process.env.WEBSERVER_URL
};

exports.config = {
    baseUrl: globalConfig.baseUrl,
    allScriptsTimeout: 7 * 60 * 10000,
    specs: ["./src/features/**/*.feature"],
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: [
                "--headless",
                "--disable-gpu",
                "--disable-infobars"
            ],
        },
    },
    framework: 'custom',
    getPageTimeout: 140000,
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['dist/**/*.js'],
        format: 'json:/tmp/results.json',
        strict: true
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    useAllAngular2AppRoots: true,
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            reportPath: "/protractor/reports",
            displayDuration: true
        }
    }],
    onPrepare: function() {
        const globals = require('protractor');
        const browser = globals.browser;
        browser.baseUrl = globalConfig.baseUrl;
        browser.ignoreSynchronization = false;
        var chai, chaiAsPromised;
        global.EC = protractor.ExpectedConditions;
        global.PTR = browser;
        global.config = globalConfig;
        chai = require('chai');
        chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        global.chai = chai;
        global.expect = chai.expect;
        return global.should = chai.should();
    }
};