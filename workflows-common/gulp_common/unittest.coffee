common = require './common'
p = require('gulp-load-plugins')()
SpecReporter = require('jasmine-spec-reporter').SpecReporter
remapIstanbul = require 'remap-istanbul/lib/gulpRemapIstanbul'

RemappedReports =
  reports:
    json: '/app/reports/coverage/json/coverage-remapped.json'
    html: '/app/reports/coverage/html'

Thresholds =
  thresholds:
    global: 50
    each: -10
  
CoverageSrc = '/app/reports/coverage/json/coverage.json'

JasmineReporter =
  reporter: new SpecReporter
    spec:
      displayPending: true
      displayStacktrace: true
  includeStackTrace: true

IstanbulReporters =
  reporters: ['json', 'text-summary']
  reportOpts:
    json:
      dir: '/app/reports/coverage/json'
      file: 'coverage.json'

module.exports =
  # TODO I have tried to implement it using streams, however, I could not manage to to it with a function that returns different versions. That's why the copypaste...
  withWatch: (gulp, c) ->
    config = common.GetConfig c

    return ->
      remapCoverageFiles = ->
        gulp.src CoverageSrc
        .pipe p.plumber
          handleError: (err) ->
            console.log "ERROR: ", err
            this.emit 'end'
        .pipe remapIstanbul RemappedReports
        .pipe p.istanbul.enforceThresholds Thresholds
        .on 'error', -> common.HandleError()
  
      gulp.src _.map c.buildRoots, (s) -> "#{s}/**/test/*.spec.js"
      .pipe p.plumber
        handleError: (err) ->
          console.log "ERROR: ", err
          this.emit 'end'
      .pipe p.jasmine JasmineReporter
      .pipe p.istanbul.writeReports IstanbulReporters
      .on 'end', remapCoverageFiles
      .on 'error', -> common.HandleError()

  noWatch: (gulp, c) ->
    config = common.GetConfig c

    return ->
      remapCoverageFiles = ->
        gulp.src CoverageSrc
        .pipe remapIstanbul RemappedReports
        .pipe p.istanbul.enforceThresholds Thresholds
  
      gulp.src _.map c.buildRoots, (s) -> "#{s}/**/test/*.spec.js"
      .pipe p.jasmine JasmineReporter
      .pipe p.istanbul.writeReports IstanbulReporters
      .on 'end', remapCoverageFiles
