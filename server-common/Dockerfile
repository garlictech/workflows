FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

ADD deps.json /app/
RUN scripts/install_dependencies /app/deps.json

CMD ["node", "/app/server/server.js"]
ENV NODE_ENV production