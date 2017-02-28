common = require './common'
p = require('gulp-load-plugins')()

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'es6'
  files = common.GetCompilableDistFiles config, "es6"

  return ->
    common.GulpSrc gulp, files, 'es6', {base: config.base}
    .pipe p.babel
      "sourceMaps": "both",
      "presets": [
        "es2015"
      ],
      "comments": true,
      "compact": false
    .pipe gulp.dest config.buildRoot
