#! /usr/bin/env bash
. .env

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  export DOCKER_IMAGE_SCOPE=prod
fi

DOCKER_TAG_SUFFIX=$(scripts/get-docker-tag.sh)
DOCKER_IMAGE=${DOCKER_REGISTRY}/${PROJECT}-${DOCKER_IMAGE_SCOPE}
DOCKER_TAG=${DOCKER_IMAGE}:${DOCKER_TAG_SUFFIX}

echo "New docker tag: $DOCKER_TAG"
docker tag ${DOCKER_IMAGE} ${DOCKER_TAG}
docker tag ${DOCKER_IMAGE} latest

DOCKER_SYSTEMTEST_IMAGE=${DOCKER_SYSTEMTEST_REGISTRY}/${PROJECT}.systemtest
DOCKER_SYSTEMTEST_TAG=${DOCKER_SYSTEMTEST_IMAGE}:${DOCKER_TAG_SUFFIX}
echo "New systemtest docker tag: $DOCKER_SYSTEMTEST_TAG"
docker tag ${DOCKER_SYSTEMTEST_IMAGE} ${DOCKER_SYSTEMTEST_TAG}
docker tag ${DOCKER_SYSTEMTEST_IMAGE} latest

echo "docker push ${DOCKER_TAG} && docker push ${DOCKER_SYSTEMTEST_TAG} && docker push ${DOCKER_IMAGE}:latest && docker push ${DOCKER_SYSTEMTEST_IMAGE}:latest"