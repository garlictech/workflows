#!/usr/bin/env bash
cd /app/project

if [[ -z "$1" ]]; then
  firebase use default
else
  firebase use $1
fi

firebase deploy --token "$FIREBASE_TOKEN"