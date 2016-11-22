#!/usr/bin/env bash

set -e

if [ -z "$GIT_USERNAME" ]; then
  echo -e "\nERROR: GIT_USERNAME environment variable is not set.\n"
  exit 0
fi

if [ -z "$GIT_EMAIL" ]; then
  echo -e "\n${COLOR}WARNING: GIT_EMAIL environment variable is not set.${NC}\n"
  exit 0
fi

git config --global user.email "$GIT_USERNAME"
git config --global user.name "$GIT_EMAIL"
cd /app/project
git-cz
