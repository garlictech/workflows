FROM node:6.6
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN mkdir -p /app/ && \
  npm install --silent -g yarn@0.17.9 && \
  npm cache clean
 
WORKDIR /app
ADD . /app
