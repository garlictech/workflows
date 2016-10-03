#!/usr/bin/env bash

SCOPE=garlictech
DOCKER_REPO_HOST=docker.garlictech.com
IMAGE_NAME=${SCOPE}-${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
# docker login -u docker -p docker https://${DOCKER_REPO_HOST}
# docker tag ${DOCKER_REPO_HOST}/${IMAGE_NAME} ${1}
# docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
