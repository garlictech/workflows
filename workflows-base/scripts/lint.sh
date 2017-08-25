#!/usr/bin/env bash

tslint --type-check --project . --config tslint.json --fix -e "dist/**" | sed "s/\/app\///"