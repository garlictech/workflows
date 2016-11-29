FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN yarn global add gulp coffee-script && \
  yarn install && \
  yarn cache clean

COPY . /app
