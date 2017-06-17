common = require './common'
p = require('gulp-load-plugins')()
merge = require 'merge2'
path = require 'path'

module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'ts'
  files =  common.GetCompilableDistFiles config, "ts"

  tsProject = p.typescript.createProject "/app/tsconfig.json"

  return ->
    tsResult = common.GulpSrc gulp, files, 'ts', {base: config.base}
    .pipe p.sourcemaps.init()
    .pipe(tsProject(p.typescript.reporter.longReporter()))
    .on 'error', -> common.HandleError()

    merge [
      tsResult.dts
      .pipe(gulp.dest config.buildRoot),

      tsResult.js
      .pipe p.sourcemaps.write
        # Return relative source map root directories per file.
        sourceRoot: (file) ->
          sourceFile = path.join file.cwd, file.sourceMap.file
          path.relative(path.dirname(sourceFile), file.cwd)
        addComment: true
      .pipe gulp.dest config.buildRoot
    ]