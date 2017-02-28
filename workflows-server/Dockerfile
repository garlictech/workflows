FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json package.shared.json /app/

RUN scripts/merge-packages.sh && \
    npm install && \
    npm cache clean && \
    mv gulp gulp_common

COPY . /app
RUN rm deps.json package.shared.json
