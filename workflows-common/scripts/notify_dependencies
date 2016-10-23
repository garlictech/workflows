#!/usr/bin/env bash

# Push an empty commit to the github repos defining machines using this service.
# The machines will pull the latest image and restart the server.
set -e
REPO="https://${GH_USER}:${GH_TOKEN}@github.com/${1}"
LOCAL_REPO=/tmp/machine_repo
git clone $REPO $LOCAL_REPO
pushd $LOCAL_REPO > /dev/null
echo "Committing changes..."
git commit -m "fix(dependency): A dependent external service changed. Repo: ${TRAVIS_REPO_SLUG} - commit: ${TRAVIS_COMMIT}" --allow-empty
echo "Pushing to github..."
git push
popd > /dev/null
echo "Cleaning up..."
rm -rf $LOCAL_REPO
