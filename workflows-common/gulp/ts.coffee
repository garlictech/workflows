common = require './common'
p = require('gulp-load-plugins')()
tsProject = p.typescript.createProject "tsconfig.json"

# handle src coffeescript files: static compilation
module.exports = (gulp, c) ->
  config = common.GetConfig c
  common.WatchFileTypes.push 'ts'

  return ->
    tsResult = tsProject.src()
    .pipe p.cached 'ts'
    .pipe p.using {}
    .pipe p.size()
    .pipe(tsProject())
    tsResult.js.pipe gulp.dest config.buildRoot
