// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

module.exports = {
    "rootDir": "../",
    "preset": "jest-preset-angular",
    "verbose": true,
    "bail": true,
    "setupTestFrameworkScriptFile": "./src/jest.ts",
    "browser": true,
    "clearMocks": true,
    "globals": {
        "ts-jest": {
            "tsConfigFile": "src/tsconfig.spec.json",
            "ignoreCoverageForDecorators": true
        },
        "__TRANSFORM_HTML__": true
    },
    "transform": {
        "^.+\\.(ts|js|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js"
    },
    "moduleFileExtensions": [
        "ts",
        "js",
        "html"
    ],
    "cacheDirectory": "./artifacts/cache",
    "moduleDirectories": ["node_modules", "src"],
    "moduleNameMapper": {
        "subrepos/(.*)": "<rootDir>/src/subrepos/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pug)$": "<rootDir>/src/test/jest/mocks/fileMock.js",
        "\\.(css|less)$": "<rootDir>/src/test/jest/mocks/styleMock.js"
    },
    "coverageDirectory": "<rootDir>/artifacts/reports/coverage",
    "coverageThreshold": {
        "global": {
            "statements": 10,
            "branches": 10,
            "functions": 10,
            "lines": 10
        }
    },
    "coverageReporters": ["json", "lcov", "text", "html"],
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "/\\.(e2e|spec)\\.ts$/",
        "/test/",
        "src/jest-global-mocks.ts",
        "src/jest.ts",
        "log.ts"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx|@ionic-native|@ionic|lodash-es)"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", ".git"]
}