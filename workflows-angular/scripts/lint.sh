#!/usr/bin/env bash

tslint --project tslint.json -e "dist/**" -e "/app/*.ts"