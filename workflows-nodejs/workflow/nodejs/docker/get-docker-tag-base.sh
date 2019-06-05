#! /usr/bin/env bash
VERSION=$(npm show @${SCOPE}/${PROJECT} version)
BUILD_ID=$(git log -1 --pretty=format:%h)
echo "${VERSION}-${BUILD_ID}"