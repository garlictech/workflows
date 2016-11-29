#!/usr/bin/env bash
if [ -n "${GH_USER}" ]; then
  git config --global user.name "${GH_USER}"
else
  echo -e "\nERROR: GH_USER environment variable is not set.\n"
  exit 0
fi

echo "GITHUB USER: $GH_USER"

if [ -n "${GH_EMAIL}" ]; then
  git config --global user.email "${GH_EMAIL}"
elif [ -n "${GH_EMAIL_RELEASE}" ]; then
  git config --global user.email "${GH_EMAIL_RELEASE}"
else
  echo -e "\nERROR: GH_EMAIL or GH_EMAIL_RELEASE environment variable is not set.\n"
  exit 0
fi
