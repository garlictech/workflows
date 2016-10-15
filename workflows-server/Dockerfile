FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN cd /app && \
  npm install --silent --save \
    mocha \
    gulp-env \
    gulp-nodemon \
    gulp-spawn-mocha \
    gulp-util \
    gutil \
    nock \
    supertest \
    nsp \
    debug \
    app-module-path \
    garlictech-common-server \
    eslint \
    eslint-config-loopback \
    nsp \
    garlictech-common-server \
    loopback-boot \
    loopback-component-explorer \
    strong-error-handler \
    loopback-datasource-juggler \
    loopback \
    yargs && \
    mv /app/gulp /app/gulp_common

COPY . /app
RUN mv /app/package.json /app/package_internal.json
