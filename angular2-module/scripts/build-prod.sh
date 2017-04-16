#!/usr/bin/env bash
set -e

npm run clean:dist
tsc && tsc -m es6 --outDir dist/lib-esm
webpack --config config/webpack.prod.js  --progress --profile --bail
