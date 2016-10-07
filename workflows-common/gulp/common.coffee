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
    console.log err
    process.exit 1


  GetConfig: (c) ->
    # srcRoot = c.srcRoot ? "src"
    # buildRoot = c.buildRoot ? "dist"
    root: "/app/project"
    base: "/app/project/src"
    buildRoot: "/app/project/dist"
    srcRoot: "/app/project/src"
