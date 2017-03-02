FROM garlictech2/server-common
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

ADD deps.json /app/

RUN scripts/merge-packages.sh && \
    npm install && \
    npm cache clean

COPY . /app
RUN rm deps.json package.shared.json