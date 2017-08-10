common = require './common'
p = require('gulp-load-plugins')()
path = require 'path'

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = common.GetCompilableDistFiles config, "coffee"

  return ->
    common.GulpSrc gulp, files, 'coffee', {base: config.base}
    .pipe p.plumber
      handleError: (err) ->
        console.log "ERROR: ", err
        this.emit 'end'
    .pipe p.sourcemaps.init()
    .pipe p.coffeelint()
    .pipe p.coffeelint.reporter()
    .pipe p.coffee(bare:true).on 'error', common.HandleError
    .pipe p.sourcemaps.write
      # Return relative source map root directories per file.
      sourceRoot: (file) ->
        sourceFile = path.join file.cwd, file.sourceMap.file
        path.relative(path.dirname(sourceFile), file.cwd)
      addComment: true
    .pipe gulp.dest config.buildRoot