#!/usr/bin/env bash

set -e
npm run clean:dist
tsc
# mv dist/src* dist/

