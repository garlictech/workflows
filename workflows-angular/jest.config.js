// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

module.exports = {
  rootDir: '../',
  preset: 'jest-preset-angular',
  verbose: true,
  bail: true,
  setupFilesAfterEnv: ['<rootDir>/src/test/jest/jest.ts'],
  browser: true,
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.spec.json',
      ignoreCoverageForAllDecorators: true,
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer'],
      babelConfig: true
    }
  },
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '\\.(pug)$': '<rootDir>/node_modules/pug-jest',
    '^.+\\.js$': '<rootDir>/src/test/jest/jest.transform.js'
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  cacheDirectory: '<rootDir>/artifacts/cache',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/jest/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/test/jest/mocks/styleMock.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules//(?!@ngrx|@ionic-native|@ionic|lodash-es|@bit)'],
  testPathIgnorePatterns: ['/node_modules/', '/artifacts/', '<rootDir>/.git/'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ],
  testEnvironment: 'jest-environment-jsdom-thirteen'
};
