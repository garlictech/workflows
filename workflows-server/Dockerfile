FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm && \
  npm install --silent fs-extra && \
  sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js && \
  cd /app && \
  npm install --silent --save \
    mocha \
    gulp-env \
    gulp-nodemon \
    gulp-spawn-mocha \
    gulp-util \
    gutil && \
    mv /app/gulp /app/gulp_common

COPY . /app
RUN mv /app/package.json /app/package_internal.json
