FROM node:8
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y --no-install-recommends vim && \
  apt-get clean && \
  rm -rf /var/lib/apt/* && \
  mkdir -p /app/ && \
  rm -rf /tmp/* && \
  cd /tmp && \
  npm install npm@latest && \
  rm -rf /usr/local/lib/node_modules && \
  mv node_modules /usr/local/lib/ && \
  wget https://github.com/git-lfs/git-lfs/releases/download/v2.3.2/git-lfs-linux-amd64-2.3.2.tar.gz && \
  tar -xf git-lfs-linux-amd64-2.3.2.tar.gz && \
  cd git-lfs-2.3.2 && \
  ./install.sh

WORKDIR /app
ADD . /app