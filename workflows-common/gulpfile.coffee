gulp = require('gulp-help') require 'gulp'

config =
  base: __dirname

require('garlictech-workflows-common/dist/gulp/client')(gulp, config)
return gulp
