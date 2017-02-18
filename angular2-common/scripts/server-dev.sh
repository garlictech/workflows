#!/usr/bin/env bash
webpack-dev-server --config config/webpack.dev.js --open --progress --profile --watch --port 8081 --host 0.0.0.0 --content-base project/src/ $@
