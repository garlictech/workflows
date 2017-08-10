common = require './common'
p = require('gulp-load-plugins')()
SpecReporter = require('jasmine-spec-reporter').SpecReporter

DEBUG = process.env.DEBUG?

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src _.map c.buildRoots, (s) -> "#{s}/**/test/*.spec.js"
    .pipe p.jasmine
      reporter: new SpecReporter
        spec:
          displayPending: true
          displayStacktrace: true
      includeStackTrace: true
    .pipe p.istanbul.writeReports()
    .pipe p.istanbul.enforceThresholds { thresholds: { global: 90 } }
    