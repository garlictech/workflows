// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

var globalConf = require('./jest.config');

module.exports = {
  ...globalConf,
  testPathIgnorePatterns: ['/node_modules/', '/artifacts/', '<rootDir>/.git/', '<rootDir>/test/']
};
