p = require('gulp-load-plugins') {config: '/app/package_internal.json'}
path = require 'path'

GLOBAL._ = require 'lodash'

module.exports =
  WatchFileTypes: []

  GulpSrc: (gulp, srcFiles, taskName, srcOptions = {}) ->
    gulp.src srcFiles, srcOptions
    .pipe p.cached taskName
    .pipe p.using {}
    .pipe p.size()


  HandleError: (err) ->


  GetConfig: (c) ->
    root: c.root
    base: "#{c.root}/src"
    buildRoot: "#{c.root}/dist"
    srcRoot: "#{c.root}/src"
