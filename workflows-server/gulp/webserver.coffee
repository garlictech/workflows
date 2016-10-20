common = require './common'
p = require('gulp-load-plugins') {config: '/app/package_internal.json'}

module.exports = (gulp, c) ->
  config = common.GetConfig c

  return ->
    p.nodemon
      env:
        NODE_ENV: 'development'
      script: "#{config.serverEntry}"
      watch: "#{config.buildRoot}"
      verbose: true
