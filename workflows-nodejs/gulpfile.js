const p = require('gulp-load-plugins')();
const merge = require('merge2');
const path = require('path');
const {
    src,
    dest,
    parallel,
    watch,
    series
} = require('gulp');

const distFolder = "/app/artifacts/dist"
const srcRoot = "project/src"
const tsProject = p.typescript.createProject("project/tsconfig.app.json");

const tsFiles = `${srcRoot}/**/*.ts`

const ts = () => {
    let tsResult = src(tsFiles)
        .pipe(p.using({}))
        .pipe(p.size())
        .pipe(p.sourcemaps.init())
        .pipe(tsProject())

    return merge([
        tsResult.dts.pipe(dest(distFolder)),
        tsResult.js.pipe(p.sourcemaps.write({
            // Return relative source map root directories per file.
            sourceRoot(file) {
                let sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            },
            addComment: true
        })).pipe(dest(distFolder))
    ])
}

const watchTsFiles = () => {
    watch(tsFiles, series(ts))
}

const jsFiles = [`${srcRoot}/**/*.json`, `${srcRoot}/**/*.js`]

const js = () => {
    return src(jsFiles)
        .pipe(p.cached('other files'))
        .pipe(p.using({}))
        .pipe(p.size())
        .pipe(dest(distFolder))
}

const watchOtherFiles = () => {
    watch(jsFiles, series(js))
}

const compile = parallel(js, ts)

exports.ts = ts
exports.js = js
exports.compile = compile
exports.default = parallel(watchOtherFiles, watchTsFiles)