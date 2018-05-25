#!/usr/bin/env bash
set -e
npm run clean:dist
webpack --config config/webpack.prod.js  --progress --profile --bail