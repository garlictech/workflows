var config, gulp;

gulp = require('gulp');

config = {
    root: "/app/project",
    src: ["server", "subrepos"],
    dist: "/app/artifacts/dist"
};

require('./gulp')(gulp, config);

return gulp;