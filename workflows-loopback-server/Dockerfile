FROM garlictech2/workflows-server
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN cd /app && \
  yarn global add --unsafe-perm strongloop && \
  yarn add --unsafe-perm \
    loopback-boot \
    loopback-component-explorer \
    strong-error-handler \
    loopback-datasource-juggler \
    loopback-connector-mongodb \
    loopback && \
  yarn cache clean

COPY . /app
RUN cp /app/package.json /app/package_internal.json
