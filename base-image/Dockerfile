FROM node:5
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && apt-get install -y vim  netcat
ADD .npmrc /root/.npmrc

ENV NODE_MODULES /usr/local/lib/
