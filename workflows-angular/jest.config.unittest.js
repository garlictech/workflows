'esversion: 6';
var globalConf = require('../jest.config.unittest');
var localConf = require('./jest.config');

module.exports = {
    ...globalConf,
    ...localConf,
    testPathIgnorePatterns: [
        '/node_modules/',
        '/artifacts/',
        '<rootDir>/.git/',
        '<rootDir>/test/',
        '<rootDir>/src/common/test/integration'
    ]
};