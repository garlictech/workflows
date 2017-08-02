#!/usr/bin/env bash

SCOPE=garlictech2
DOCKER_REPO_HOST=${SCOPE}
IMAGE_NAME=${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
# docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
# docker tag ${DOCKER_REPO_HOST}/${IMAGE_NAME} ${DOCKER_REPO_HOST}/${IMAGE_NAME}:v1.18.4
# docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
