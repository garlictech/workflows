#!/usr/bin/env bash
set -e
. /app/project/.env

S3_BUCKET=${PROJECT_SCOPE}-deployment
RELEASE_FILE=${PROJECT}-${DOCKER_IMAGE_SCOPE}_deploy.json
RELEASE_FILE_ZIP=${RELEASE_FILE}.zip

aws configure set default.s3.signature_version s3v4
cd /app/project
DOCKER_TAG=$(/app/scripts/get-docker-tag.sh)
echo "{\"Tag\": \"${DOCKER_TAG}\"}" > ${RELEASE_FILE}
zip ${RELEASE_FILE_ZIP} ${RELEASE_FILE}
aws s3 cp ${RELEASE_FILE_ZIP} s3://${S3_BUCKET}/${PROJECT}/${RELEASE_FILE_ZIP}

echo "if you can see an upload failed: message, then probably you can safely ignore it... it is always displayed for a reason."