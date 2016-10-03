watch = require 'gulp-debounced-watch'
common = require './common'

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    _.forEach common.WatchFileTypes, (type) ->
      watch ["#{config.srcRoot}/**/*.#{type}"], {debounceTimeout: 1000}, ->
        gulp.start 'build'
