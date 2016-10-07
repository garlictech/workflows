watch = require 'gulp-debounced-watch'
common = require './common'

module.exports = (gulp, c, fileTypes) ->
  config = common.GetConfig c

  return ->
    _.forEach fileTypes, (type) ->
      unittestTaskName = "unittest after compiling #{type}"
      gulp.task unittestTaskName, [type], -> gulp.start 'unittest'

      watch ["#{config.srcRoot}/**/*.#{type}"], {debounceTimeout: 1000}, ->
        gulp.start unittestTaskName
