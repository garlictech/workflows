common = require './common'
p = require('gulp-load-plugins')()

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src _.flatten _.map c.buildRoots, (s) -> ["#{s}/**/*.js", "!#{s}/**/*.spec.js"]
    .pipe p.plumber
      errorHandler: (err) ->
        console.log(err)
        this.emit 'end'
    .pipe p.istanbul()
    .pipe p.istanbul.hookRequire()
