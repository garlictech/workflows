common = require './common'

module.exports = (_gulp, config) ->
  gulp = require('gulp-help') _gulp
  config = common.GetConfig config
  commonFileTypes = ['coffee']

  for name in commonFileTypes
    gulp.task name, require("/app/gulp_common/#{name}")(gulp, config)

  serverFileTypes = ['js', 'json', 'html', 'tpl']

  for name in serverFileTypes
    gulp.task name, require("./#{name}")(gulp, config)

  fileTypes = _.union commonFileTypes, serverFileTypes

  gulp.task 'compile', fileTypes

  gulp.task 'watch', require('./watch')(gulp, config, fileTypes)
  
  gulp.task 'unittest', require('./unittest')(gulp, config)

  gulp.task 'systemtest', require('./systemtest')(gulp, config)
  
  gulp.task 'build', ['compile']
  
  gulp.task 'webserver', require('./webserver')(gulp, config)
  
  gulp.task 'default', ['build'], ->
    gulp.start 'watch'
    gulp.start 'webserver'

  require('/app/gulp_common/bump')(gulp, config)

  return gulp
