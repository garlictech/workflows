#!/usr/bin/env bash
. /app/project/.env

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > $HOME/.npmrc

if [[ $TRAVIS_BRANCH == "master" ]]; then
  export DOCKER_IMAGE_SCOPE=prod
fi

cd /app/project
DOCKER_IMAGE=${DOCKER_REGISTRY}/${PROJECT}-${DOCKER_IMAGE_SCOPE}
DOCKER_TAG=${DOCKER_IMAGE}:$(scripts/get-docker-tag.sh)

S3_BUCKET=${PROJECT_SCOPE}-deployment
RELEASE_FILE_CC=${PROJECT}-${DOCKER_IMAGE_SCOPE}-deploy.json
RELEASE_FILE=$(echo ${RELEASE_FILE_CC} | sed -r 's/(^|-)(\w)/\U\2/g')
RELEASE_FILE_ZIP=${RELEASE_FILE}.zip

aws configure set default.s3.signature_version s3v4
echo "{\"name\": \"${PROJECT}-${DOCKER_IMAGE_SCOPE}\", \"imageUri\": \"${DOCKER_TAG}\"}" > ${RELEASE_FILE}
zip ${RELEASE_FILE_ZIP} ${RELEASE_FILE}
aws s3 cp ${RELEASE_FILE_ZIP} s3://${S3_BUCKET}/${PROJECT}/${RELEASE_FILE_ZIP}

echo "if you can see an upload failed: message, then probably you can safely ignore it... it is always displayed for a reason."