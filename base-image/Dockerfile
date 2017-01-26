FROM node:6.6
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y vim && \
  apt-get clean && \
  mkdir -p /app/

WORKDIR /app

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm && \
  npm install --silent fs-extra && \
  sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js && \
  npm install --silent -g npm && \
  cd /app && \
  npm install --save --silent lodash fs-extra
  
ADD . /app
