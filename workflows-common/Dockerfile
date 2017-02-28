FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json package.shared.json /app/

RUN scripts/merge-packages.sh && \
    npm install && \
    npm cache clean

COPY . /app
RUN rm deps.json package.shared.json