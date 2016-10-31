#!/usr/bin/env bash

SCOPE=garlictech2
DOCKER_REPO_HOST=${SCOPE}
IMAGE_NAME=${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
