FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

WORKDIR /app

RUN yarn add --production garlictech-common-server

CMD ["node", "/app/server/server.js"]
