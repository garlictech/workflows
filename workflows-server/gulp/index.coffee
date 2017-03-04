common = require './common'

module.exports = (_gulp, config) ->
  gulp = require('gulp-help') _gulp
  config = common.GetConfig config
  commonFileTypes = ['coffee', 'js', 'es6', 'ts', 'json']

  for name in commonFileTypes
    gulp.task name, require("/app/gulp_common/#{name}")(gulp, config)

  serverFileTypes = ['tpl']

  for name in serverFileTypes
    gulp.task name, require("./#{name}")(gulp, config)

  fileTypes = _.union commonFileTypes, serverFileTypes

  gulp.task 'compile', fileTypes

  gulp.task 'watch', ['build'], require('./watch')(gulp, config, fileTypes)
  
  gulp.task 'unittest', require('./unittest')(gulp, config)

  gulp.task 'systemtest', require('./systemtest')(gulp, config)
  
  gulp.task 'build', ['compile']
  
  gulp.task 'webserver', require('./webserver')(gulp, config)

  gulp.task 'debug', require('./debug')(gulp, config)
  
  gulp.task 'default', ->
    gulp.start 'watch'
    gulp.start 'webserver'

  return gulp
