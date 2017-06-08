FROM node:8
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y --no-install-recommends vim && \
  apt-get clean && \
  rm -rf /var/lib/apt/* && \
  mkdir -p /app/ && \
  rm -rf /tmp/* && \
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > $HOME/.npmrc

WORKDIR /app
ADD . /app