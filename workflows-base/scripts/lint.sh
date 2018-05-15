#!/usr/bin/env bash

tslint --config tslint.json --project . --fix -e "dist/**" | sed "s/\/app\///"