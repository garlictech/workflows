#! /usr/bin/env bash
. .env

if [ $TRAVIS_BRANCH = "master" ]; then
  export DOCKER_IMAGE_SCOPE=prod
fi

DOCKER_IMAGE=${DOCKER_REGISTRY}/${PROJECT}-${DOCKER_IMAGE_SCOPE}
DOCKER_TAG=${DOCKER_IMAGE}:$(scripts/get-docker-tag.sh)

echo "New docker tag: $DOCKER_TAG"
docker tag ${DOCKER_IMAGE} ${DOCKER_TAG}