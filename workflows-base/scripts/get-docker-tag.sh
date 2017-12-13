#! /usr/bin/env bash
. /app/project/.env

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> /root/.npmrc
VERSION=$(npm show @${SCOPE}/${PROJECT} version)
BUILD_ID=$(git log -1 --pretty=format:%h)
echo "${VERSION}-${BUILD_ID}"