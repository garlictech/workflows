common = require './common'

module.exports = (gulp, c, fileTypes) ->
  config = common.GetConfig c

  return ->
    files = _.flatten _.map fileTypes, (type) ->
      unittestTaskName = "unittest after compiling #{type}"
      gulp.task unittestTaskName, [type], -> gulp.start 'unittest-watch'
      _.map config.srcRoots, (dir) -> "#{dir}/**/*.#{type}"

    gulp.watch files, {debounceDelay: 1000}, ['unittest-watch']
