FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY deps.json package.shared.json /app/

RUN scripts/merge-packages.sh && \
    npm install && \
    npm cache clean

COPY . /app
RUN rm deps.json

CMD ["node", "/app/server/server.js"]
ENV NODE_ENV production