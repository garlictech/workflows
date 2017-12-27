common = require './common'
p = require('gulp-load-plugins')()

# handle src coffeescript files: static compilation
module.exports = (gulp, c, fileType) ->
  config = common.GetConfig c
  files = common.GetCompilableDistFiles config, fileType

  return ->
    common.GulpSrc gulp, files, fileType, {base: config.base}
    .pipe gulp.dest config.buildRoot
    .on 'error', -> common.HandleError()
