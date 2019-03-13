// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

module.exports = {
    rootDir: '../',
    preset: 'jest-preset-angular',
    verbose: true,
    bail: true,
    setupFilesAfterEnv: ['./src/jest.ts'],
    browser: true,
    clearMocks: true,
    globals: {
        'ts-jest': {
            tsConfigFile: 'src/tsconfig.spec.json',
            ignoreCoverageForAllDecorators: true
        },
        __TRANSFORM_HTML__: true
    },
    transform: {
        '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
        '\\.(pug)$': '<rootDir>/node_modules/pug-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    cacheDirectory: './artifacts/cache',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/test/jest/mocks/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/test/jest/mocks/styleMock.js'
    },
    transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic|lodash-es|@bit)']
};