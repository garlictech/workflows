common = require './common'
p = require('gulp-load-plugins')()
merge = require 'merge2'

module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'ts'
  files =  common.GetCompilableDistFiles config, "ts"

  tsProject = p.typescript.createProject
    "target": "es5",
    "module": "commonjs"
  , p.typescript.reporter.longReporter()

  return ->
    tsResult = common.GulpSrc gulp, files, 'ts', {base: config.base}
    .pipe p.sourcemaps.init()
    .pipe p.sourcemaps.write()
    .pipe(tsProject())
    .on 'error', -> common.HandleError()

    merge [
      tsResult.pipe p.sourcemaps.write()
      tsResult.dts.pipe(gulp.dest config.buildRoot),
      tsResult.js.pipe gulp.dest config.buildRoot
    ]
