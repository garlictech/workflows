#!/usr/bin/env bash

tslint --project --config tslint.json --fix -e "dist/**" | sed "s/\/app\///"