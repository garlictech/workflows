common = require './common'
p = require('gulp-load-plugins') {config: '/app/package_internal.json'}

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'coffee'
  coffeeFiles = _.map config.srcRoots, (dir) -> "#{dir}/**/*.coffee"

  return ->
    common.GulpSrc gulp, coffeeFiles, 'coffee', {base: config.base}
    .pipe p.coffeelint()
    .pipe p.coffeelint.reporter()
    .pipe p.coffee(bare:true).on 'error', common.HandleError
    .pipe gulp.dest config.buildRoot
