#!/usr/bin/env bash

prettier --single-quote \
  --print-width 120 \
  --tab-width 2 \
  --single-quote \
  --write "/app/project/**/*.ts"