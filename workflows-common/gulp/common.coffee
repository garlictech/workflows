p = require('gulp-load-plugins')()
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
    srcRoot = c.srcRoot ? "src"
    buildRoot = c.buildRoot ? "dist"

    root: c.root
    base: path.join c.root, srcRoot
    buildRoot: buildRoot
    srcRoot: srcRoot
    unittestEntry: path.join buildRoot, 'test', 'unit', 'index.js'
    systemtestEntry: path.join buildRoot, 'test', 'system', 'index.js'
