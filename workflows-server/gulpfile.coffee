gulp = require 'gulp'

config =
  root: "/app/project"

require('./gulp')(gulp, config)

gulp.task 'default', ['build'], ->
  gulp.start 'watch'
