#!/usr/bin/env bash
PROJECT=$1
COMPONENT=$2

cd /app/project

firebase use $PROJECT-${PROJECT_CONFIG}
firebase deploy --token "$FIREBASE_TOKEN" --only hosting:${COMPONENT}
