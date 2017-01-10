p = require('gulp-load-plugins') {config: '/node_tmp/package.json'}
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
    srcs = if not _.isArray(c.src) then [c.src] else c.src

    res = c
    c.base = "#{c.root}"
    c.buildRoot = "#{c.root}/dist"
    c.srcRoots = _.map srcs, (s) -> "#{c.root}/#{s}"
    return res
