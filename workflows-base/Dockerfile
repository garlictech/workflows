FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY package.json /app

RUN npm install -g coffee coffee-script gulp firebase-tools && \
  npm install --save lodash fs-extra merge && \
  echo "{}" > package.shared-prod.json

COPY . /app
