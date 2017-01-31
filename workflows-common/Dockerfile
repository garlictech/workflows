FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN npm install -g --silent coffee coffee-script gulp firebase-tools

COPY package.json deps.json /app/

RUN scripts/install_dependencies deps.json

COPY . /app
