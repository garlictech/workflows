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
    res = c
    c.base = "#{c.root}/#{c.src}"
    c.buildRoot = "#{c.root}/dist"
    c.srcRoot = "#{c.root}/#{c.src}"
    return res
