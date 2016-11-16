FROM garlictech2/server-common
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN npm install --silent \
    loopback-boot \
    loopback-component-explorer \
    strong-error-handler \
    loopback-datasource-juggler \
    loopback-connector-mongodb \
    loopback && \
    npm cache clean
