#!/usr/bin/env bash
source ../scripts/build.sh angular2
docker run --rm --entrypoint cat garlictech2/angular2:latest /app/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "We have a new yarn.lock"
  cp /tmp/yarn.lock yarn.lock
fi