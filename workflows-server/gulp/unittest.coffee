common = require './common'
p = require('gulp-load-plugins')()

DEBUG = process.env.DEBUG?

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src [config.unittestEntry, "#{config.buildRoot}/**/test/*.spec.js"], {read: false}
    .pipe p.spawnMocha
      debugBrk: DEBUG
      reporter: 'spec'
      ui: 'bdd'
      recursive: true
    # .pipe p.jasmine()
    .once 'error', -> common.HandleError()
