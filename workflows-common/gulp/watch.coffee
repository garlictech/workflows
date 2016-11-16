watch = require 'gulp-debounced-watch'
common = require './common'

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    _.forEach common.WatchFileTypes, (type) ->
      files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.#{type}"
      
      watch files, {debounceTimeout: 1000}, ->
        gulp.start 'build'
