FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

ADD package.json /app/
RUN scripts/install_dependencies /app/package.json

CMD ["node", "/app/server/server.js"]
