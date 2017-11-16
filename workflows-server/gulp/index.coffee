fs = require 'fs'
common = require './common'

module.exports = (_gulp, config) ->
  gulp = require('gulp-help') _gulp
  config = common.GetConfig config
  commonFileTypes = ['coffee', 'js', 'ts', 'json']

  for name in commonFileTypes
    gulp.task name, require("/app/gulp_common/#{name}")(gulp, config)

  serverFileTypes = ['tpl']

  for name in serverFileTypes
    gulp.task name, require("./#{name}")(gulp, config)

  fileTypes = _.union commonFileTypes, serverFileTypes

  gulp.task 'compile', fileTypes

  gulp.task 'watch', ['build'], require('/app/gulp_common/watch')(gulp, config, fileTypes)
  
  gulp.task 'pre-test', require('/app/gulp_common/pre-test')(gulp, config)

  gulp.task 'unittest-watch', ['pre-test'], require("/app/gulp_common/unittest").withWatch gulp, config

  gulp.task 'unittest', ['pre-test'], require("/app/gulp_common/unittest").noWatch(gulp, config)
  
  gulp.task 'systemtest', require("/app/gulp_common/systemtest")(gulp, config)
  
  gulp.task 'build', ['compile']
  
  gulp.task 'server', require('/app/gulp_common/server')(gulp, config)

  gulp.task 'debug', require('./debug')(gulp, config)
  
  gulp.task 'default', ->
    gulp.start 'watch'
    gulp.start 'server'

  # Configure the hooks
  if fs.existsSync '/app/hooks/gulp/'
    console.log "Executing the gulp hooks..."
    require('/app/hooks/gulp/') gulp, config
  else
    console.log "There are no gulp hooks, skipping."

  return gulp
