#! /usr/bin/env bash
set -e

# ADD YOUR PARTS HERE
docker run -i -t \
  -v $(pwd):/app/project \
  -e NPM_TOKEN \
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -e TRAVIS_BRANCH \
  garlictech2/workflows-library:${npm_package_config_dockerWorkflowVersion} scripts/aws-docker-release-to-prod.sh