#!/usr/bin/env bash

apt-get update

apt-get install -y \
  x11vnc \
  ratpoison

apt-get clean
rm -rf /var/lib/apt/lists/*
cd /

npm install -g --silent coffee

npm install --silent \
  chai \
  chai-as-promised \
  coffee-script \
  lodash \
  bluebird \
  request

npm cache clean
