common = require './common'
p = require('gulp-load-plugins')()

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = coffeeFiles = common.GetCompilableDistFiles config, "js"

  return ->
    common.GulpSrc gulp, files, 'js', {base: config.base}
    .pipe gulp.dest config.buildRoot
