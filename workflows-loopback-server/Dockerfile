FROM garlictech2/workflows-server
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json /app

RUN scripts/install_dependencies deps.json && \
  rm /app/deps.json

COPY . /app
