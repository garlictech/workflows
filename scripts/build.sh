#!/usr/bin/env bash

SCOPE=garlictech
DOCKER_REPO_HOST=docker.garlictech.com
IMAGE_NAME=${SCOPE}-${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .
docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD} https://${DOCKER_REPO_HOST}
docker push ${DOCKER_REPO_HOST}/${IMAGE_NAME}
