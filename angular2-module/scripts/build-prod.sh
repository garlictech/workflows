#!/usr/bin/env bash
set -e

rm -rf dist/ngx
mkdir -p dist/ngx
tsc --outDir dist/ngx/lib
tsc -m es6 --outDir dist/ngx/lib-esm
webpack --config config/webpack.prod.js --profile --bail
