#! /usr/bin/env bash
. /app/project/.env

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> /root/.npmrc
scripts/get-docker-tag-base.sh