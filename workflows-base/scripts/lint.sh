#!/usr/bin/env bash

tslint --project tslint.json --fix -e "dist/**" | sed "s/\/app\///"