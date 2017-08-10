common = require './common'

module.exports = (gulp, c, fileTypes) ->
  config = common.GetConfig c

  return ->
    _.forEach fileTypes, (type) ->
      files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.#{type}"
      
      gulp.watch files, {debounceDelay: 1000}, ['build']
