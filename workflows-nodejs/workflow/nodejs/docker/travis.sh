#!/usr/bin/env bash

# DON'T MODIFY THIS FILE, IT'S GENERATED
docker run -i -t \
  -v $(pwd):/app/project \
  -e CI \
  -e TRAVIS \
  -e TRAVIS_BRANCH \
  -e TRAVIS_EVENT_TYPE \
  -e TRAVIS_REPO_SLUG \
  -e TRAVIS_COMMIT \
  -e GH_USER="$(git config --get user.name)" \
  -e GH_EMAIL="$(git config --get user.email)" \
  -e GH_TOKEN \
  -e NPM_TOKEN \
  garlictech2/workflows-base:${npm_package_config_dockerWorkflowVersion} npm run travis $@
