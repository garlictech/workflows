#!/usr/bin/env bash
set -e
./node_modules/.bin/ngc -p config/tsconfig.server.json
webpack --config config/webpack.server.js --progress
rimraf ./lib
