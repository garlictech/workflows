common = require './common'
p = require('gulp-load-plugins')()
#  {config: '/node_tmp/package.json'}
tsProject = p.typescript.createProject "./tsconfig.json"

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'ts'
  files = _.map config.srcRoots, (dir) -> "#{dir}/**/*.ts"

  return ->
    common.GulpSrc gulp, files, 'ts', {base: config.base}
    .pipe(tsProject())
    .pipe gulp.dest config.buildRoot
