FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install -g --silent gulp coffee && \
  npm install --silent && \
  npm link gulp && \
  git config --global user.email "contact@garlictech.com" && \
  git config --global user.name "Garlic Tech Ltd."

COPY . /app
