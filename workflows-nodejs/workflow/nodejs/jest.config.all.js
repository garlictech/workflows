// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

var globalConf = require('./jest.config');

module.exports = {
  ...globalConf,
  coverageDirectory: '<rootDir>/artifacts/reports/coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '\\.(e2e|spec|d)\\.ts$', '/test/'],
  collectCoverageFrom: ['project/src/*/**/*.ts']
};
