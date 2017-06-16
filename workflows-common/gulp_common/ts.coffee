common = require './common'
p = require('gulp-load-plugins')()
merge = require 'merge2'

module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'ts'
  files =  common.GetCompilableDistFiles config, "ts"

  tsProject = p.typescript.createProject "/app/tsconfig.json"
  , p.typescript.reporter.longReporter()

  return ->
    tsResult = common.GulpSrc gulp, files, 'ts', {base: config.base}
    .pipe p.sourcemaps.init()
    .pipe(tsProject())
    .on 'error', -> common.HandleError()

    merge [
      tsResult.dts
      .pipe(gulp.dest config.buildRoot),

      tsResult.js
      .pipe p.sourcemaps.write('.', {addComment: false})
      .pipe gulp.dest config.buildRoot
    ]