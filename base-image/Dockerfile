FROM node:8
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y --no-install-recommends vim && \
  apt-get clean && \
  rm -rf /var/lib/apt/* && \
  mkdir -p /app/ && \
  rm -rf /tmp/*

WORKDIR /app
ADD . /app