#!/usr/bin/env bash
cd /app/project

firebase use $1
firebase deploy --token "$FIREBASE_TOKEN" --only hosting:$1

firebase use docs
firebase deploy --token "$FIREBASE_TOKEN" --only hosting:docs

firebase use coverage
firebase deploy --token "$FIREBASE_TOKEN" --only hosting:coverage

firebase use e2e
firebase deploy --token "$FIREBASE_TOKEN" --only hosting:e2e