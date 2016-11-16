watch = require 'gulp-debounced-watch'
common = require './common'

module.exports = (gulp, c, fileTypes) ->
  config = common.GetConfig c

  return ->
    _.forEach fileTypes, (type) ->
      unittestTaskName = "unittest after compiling #{type}"
      gulp.task unittestTaskName, [type], -> gulp.start 'unittest'
      files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.#{type}"

      watch files, {debounceTimeout: 1000}, ->
        gulp.start unittestTaskName
