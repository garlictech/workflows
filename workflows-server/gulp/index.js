var common, fs;

fs = require('fs');

common = require('./common');

module.exports = function(gulp, config) {
    var fileTypes, i, j, len, len1, name, staticFileTypes;
    config = common.GetConfig(config);
    fileTypes = ['ts'];
    for (i = 0, len = fileTypes.length; i < len; i++) {
        name = fileTypes[i];
        gulp.task(name, require(`/app/gulp_common/${name}`)(gulp, config));
    }
    staticFileTypes = ['html', 'js', 'json', 'tpl'];
    for (j = 0, len1 = staticFileTypes.length; j < len1; j++) {
        name = staticFileTypes[j];
        gulp.task(name, require("/app/gulp_common/static-files")(gulp, config, name));
    }
    fileTypes = _.union(fileTypes, staticFileTypes);
    gulp.task('compile', fileTypes);
    gulp.task('watch', ['build'], require('/app/gulp_common/watch')(gulp, config, fileTypes));
    gulp.task('systemtest', require("/app/gulp_common/systemtest")(gulp, config));
    gulp.task('build', ['compile']);
    gulp.task('server', require('/app/gulp_common/server')(gulp, config));
    gulp.task('debug', require('./debug')(gulp, config));
    gulp.task('default', function() {
        gulp.start('watch');
        return gulp.start('server');
    });
    // Configure the hooks
    if (fs.existsSync('/app/hooks/gulp/')) {
        console.log("Executing the gulp hooks...");
        require('/app/hooks/gulp/')(gulp, config);
    } else {
        console.log("There are no gulp hooks, skipping.");
    }
    return gulp;
};