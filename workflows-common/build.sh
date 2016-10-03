#!/usr/bin/env bash

SCOPE=garlictech
DOCKER_REPO_HOST=docker.${SCOPE}.com
IMAGE_NAME=${SCOPE}-workflows-common

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
# docker login -u docker -p docker https://${DOCKER_REPO_HOST}
# docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
