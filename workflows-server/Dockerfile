FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN cd /app && \
  yarn add  \
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
    yargs && \
    mv /app/gulp /app/gulp_common && \
    yarn cache clean

COPY . /app
RUN cp /app/package.json /app/package_internal.json
