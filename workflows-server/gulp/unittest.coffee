common = require './common'
p = require('gulp-load-plugins') {config: '/node_tmp/package.json'}

DEBUG = process.env.DEBUG?

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    gulp.src [config.unittestEntry, "#{config.buildRoot}/**/globals.js", "#{config.buildRoot}/**/*unit-tests.js"], {read: false}
    .pipe p.spawnMocha
      debugBrk: DEBUG
      reporter: 'spec'
      ui: 'bdd'
      recursive: true
    .once 'error', -> common.HandleError()
