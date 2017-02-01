common = require './common'
p = require('gulp-load-plugins')()
#  {config: '/node_tmp/package.json'}

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.html"

  return ->
    common.GulpSrc gulp, files, 'html', {base: config.base}
    .pipe gulp.dest config.buildRoot
