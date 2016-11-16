FROM garlictech2/workflows-server
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN cd /app && \
  npm install -g --silent --unsafe-perm strongloop && \
  npm install --unsafe-perm --silent --save \
    loopback-boot \
    loopback-component-explorer \
    strong-error-handler \
    loopback-datasource-juggler \
    loopback-connector-mongodb \
    loopback && \
  npm cache clean

COPY . /app
RUN cp /app/package.json /app/package_internal.json
