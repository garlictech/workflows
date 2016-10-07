common = require './common'
p = require('gulp-load-plugins') {config: '/app/package_internal.json'}

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    # p.env.set NODE_ENV: "test"
    gulp.src [config.unittestEntry, "#{config.buildRoot}/**/*unit-tests.js"], {read: false}
    .pipe p.spawnMocha
      reporter: 'spec'
      ui: 'bdd'
      recursive: true
    .once 'error', -> common.HandleError()
