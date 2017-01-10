FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json /app

RUN yarn add lodash fs-extra && \
  scripts/install_dependencies deps.json && \
  rm deps.json

COPY . /app
