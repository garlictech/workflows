FROM node:6.6
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y --no-install-recommends vim && \
  apt-get clean && \
  rm -rf /var/lib/apt/* && \
  mkdir -p /app/

WORKDIR /app

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm && \
  npm install --silent fs-extra && \
  sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js && \
  npm install --silent -g npm && \
  rm -rf /tmp/*

ADD . /app
