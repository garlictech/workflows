FROM docker.garlictech.com/garlictech-base-image

MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
  && npm install --silent fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

RUN npm install --silent -g gulp coffee coffeelint

VOLUME /app
WORKDIR /app
EXPOSE 3000
ENTRYPOINT [ "npm" ]