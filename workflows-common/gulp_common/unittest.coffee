common = require './common'
p = require('gulp-load-plugins')()
SpecReporter = require('jasmine-spec-reporter').SpecReporter

DEBUG = process.env.DEBUG?

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src ["#{config.buildRoot}/**/test/*.spec.js"]
    .pipe p.jasmine
      reporter: new SpecReporter
        spec:
          displayPending: true
          displayStacktrace: true
      includeStackTrace: true
