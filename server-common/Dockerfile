FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

WORKDIR /app

RUN npm install --silent --production garlictech-common-server && \
  npm cache clean

CMD ["node", "/app/server.js"]
