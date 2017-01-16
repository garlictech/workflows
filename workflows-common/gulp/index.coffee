module.exports = (_gulp, config) ->
  gulp = require('gulp-help') _gulp

  fileTypes = ['coffee', 'css']

  for name in fileTypes
    gulp.task name, require("./#{name}")(gulp, config)

  gulp.task 'compile', fileTypes
  
  gulp.task 'build', ['compile']
  
  gulp.task 'default', ['build'], ->
    gulp.start 'watch'

  gulp.task 'watch', require('./watch')(gulp, config)

  return gulp
