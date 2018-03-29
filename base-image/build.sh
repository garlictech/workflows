#!/usr/bin/env bash
docker pull node:8
source ../scripts/build.sh "${PWD##*/}"
