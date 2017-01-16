#!/usr/bin/env bash

set -e
npm run clean:build
tsc -p /app/project/src
