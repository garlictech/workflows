common = require './common'
p = require('gulp-load-plugins')()

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.json"

  return ->
    common.GulpSrc gulp, files, 'json', {base: config.base}
    .pipe gulp.dest config.buildRoot
