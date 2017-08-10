common = require './common'
p = require('gulp-load-plugins')()
SpecReporter = require('jasmine-spec-reporter').SpecReporter

DEBUG = process.env.DEBUG?

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src _.map c.buildRoots, (s) -> "#{s}/**/*.js"
    .pipe p.istanbul()
    .pipe p.istanbul.hookRequire()
    .pipe p.sourcemaps.write('.')
    .pipe p.istanbul.writeReports
      dir: '/app/reports',
      reporters: [ 'text', 'text-summary', 'html'],
      reportOpts: { dir: '/app/reports' }
    .pipe gulp.dest '/app/reports'
