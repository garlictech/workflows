var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var path = require('path');
var webdriver_update = require("gulp-protractor").webdriver_update;
var protractor = require("gulp-protractor").protractor;
var clean = require("gulp-clean");
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject(ts.reporter.longReporter()));

    return merge([
        tsResult.dts
        .pipe(gulp.dest('dist')),

        tsResult.js
        .pipe(sourcemaps.write({
            sourceRoot: (file) => {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            },
            addComment: true
        }))
        .pipe(gulp.dest('dist'))
    ]);
});

gulp.task("webdriver_update", webdriver_update);