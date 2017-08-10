common = require './common'
p = require('gulp-load-plugins')()

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src _.flatten _.map c.buildRoots, (s) -> ["#{s}/**/*.js", "!#{s}/**/*.spec.js"]
    .pipe p.istanbul()
    .pipe p.istanbul.hookRequire()
