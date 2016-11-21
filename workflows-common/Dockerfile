FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install -g --silent gulp coffee-script && \
  npm install --silent && \
  npm link gulp && \
  npm cache clean

COPY . /app
