#! /usr/bin/env bash
. .env
echo "Logging in to docker..."

if [[ -n ${PUSH_TO_AWS} ]]; then
  echo "Logging in to AWS"
  $(aws ecr get-login --region us-east-1 | sed 's/-e none//g')
fi

# This is a temporary stuff...
echo "Logging in to systemtest repo"
docker login -u docker -p ${DOCKER_PASSWORD} https://${DOCKER_SYSTEMTEST_REGISTRY}