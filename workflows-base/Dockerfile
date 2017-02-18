FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY package.json /app

RUN npm install -g --silent coffee coffee-script gulp firebase-tools netlify-cli && \
  npm install --save --silent lodash fs-extra

COPY . /app

