#!/usr/bin/env bash

prettier --single-quote \
  --print-width 120 \
  --tab-width 2 \
  --single-quote \
  --no-bracket-spacing \
  --write "/app/project/**/*.ts"