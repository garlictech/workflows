#!/usr/bin/env bash

SCOPE=garlictech2
DOCKER_REPO_HOST=${SCOPE}
IMAGE_NAME=${1}

docker build -t ${DOCKER_REPO_HOST}/${IMAGE_NAME} .

