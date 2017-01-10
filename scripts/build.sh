#!/usr/bin/env bash

SCOPE=garlictech2
DOCKER_REPO_HOST=${SCOPE}
IMAGE_NAME=${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
# docker run --rm --entrypoint cat ${DOCKER_REPO_HOST}/${IMAGE_NAME}:latest /node_tmp/yarn.lock > /tmp/yarn.lock

# if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
#   echo "We have a new yarn.lock"
#   cp /tmp/yarn.lock yarn.lock
# fi

# docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
# docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
