common = require './common'
p = require('gulp-load-plugins')()
merge = require 'merge-stream'

module.exports = (gulp, c) ->
  config = common.GetConfig c
  scssFiles = _.map config.srcRoots, (dir) -> "#{dir}/**/*.scss"
  cssFiles = _.map config.srcRoots, (dir) -> "#{dir}/**/*.css"

  cssStream = common.GulpSrc gulp, cssFiles, 'css', {base: config.base}
    .pipe p.concat "css-files.css"

  scssStream = common.GulpSrc gulp, scssFiles, 'scss', {base: config.base}
    .pipe p.sass()
    .pipe p.concat 'scss-files.scss'

  return ->
    merge scssStream, cssStream
      .pipe p.concat "#{config.cssBundleName}.min.css"
      .pipe p.minify()
      .pipe p.uglifycss()
      .pipe gulp.dest config.dist
