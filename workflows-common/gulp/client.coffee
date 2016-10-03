module.exports = (_gulp, config) ->
  gulp = require('gulp-help') _gulp

  require('./bump')(gulp, config)

  return gulp
