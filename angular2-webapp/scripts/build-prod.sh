#!/usr/bin/env bash

set -e
npm run clean:build
webpack --config config/webpack/webpack.prod.js --profile --bail
