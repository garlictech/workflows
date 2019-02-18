// Don't use this file as jest config, use the app-level config file in src. That file must import this one and re-export
// it with or without modifications.
// That file contains the workflow level global settigns, so if you overwrite this one, the workflow test runs may
// return different result.

module.exports = {
    "rootDir": "../",
    "verbose": true,
    "bail": true,
    "browser": false,
    "clearMocks": true,
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "transform": {
        "\\.(ts|tsx)$": "ts-jest"
    },
    "cacheDirectory": "./artifacts/cache",
    "moduleDirectories": ["node_modules", "project/src"],
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
        "\\.(spec|d)\\.ts$",
        "/test/",
        "src/jest-global-mocks.ts",
        "src/jest.ts",
        "log.ts",
        "assets"
    ],
    "collectCoverageFrom": ["project/src/*/**/*.ts"],
    "transformIgnorePatterns": [
        "node_modules/(?!@bit)"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/artifacts/", "<rootDir>/.git", "<rootDir>/project/test"]
}