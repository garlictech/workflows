common = require './common'
path = require 'path'
tag_version = require 'gulp-tag-version'
p = require('gulp-load-plugins')()
 
###
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
###

module.exports = (gulp, c) ->
  config = common.GetConfig c
  cwd = {cwd: "/app/project"}

  inc = (importance) ->
    # get all the files to bump version in
    return gulp.src([path.join(config.root, 'package.json'), path.join(config.root, 'bower.json')])
      # bump the version number in those files
      .pipe(p.bump({type: importance}))
      # save it back to filesystem
      .pipe(gulp.dest(config.root))
      # commit the changed version number
      .pipe(p.git.commit('bumps package version', cwd))

      # read only one file to get the version number
      .pipe(p.filter('package.json'))
      # **tag it in the repository**
      .pipe(tag_version(cwd))
   
  gulp.task 'patch', -> inc('patch')
  gulp.task 'feature', -> inc('minor')
  gulp.task 'release', -> inc('major')
