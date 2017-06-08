common = require './common'
p = require('gulp-load-plugins')()

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.html"

  return ->
    common.GulpSrc gulp, files, 'html', {base: "#{config.base}/src"}
    .pipe gulp.dest config.dist
    .on 'error', -> common.HandleError()
