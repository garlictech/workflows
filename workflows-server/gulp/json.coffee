common = require './common'
p = require('gulp-load-plugins') {config: '/app/package_internal.json'}

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  files = ["#{config.srcRoot}/**/*.json"]

  return ->
    common.GulpSrc gulp, files, 'json', {base: config.base}
    .pipe gulp.dest config.buildRoot
