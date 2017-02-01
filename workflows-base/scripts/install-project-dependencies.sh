#!/usr/bin/env bash

. scripts/deps-common.sh

scripts/get-package.json.coffee  "$1" > $COMMON_UPDATED_PACKAGE_JSON
scripts/install_dependencies $COMMON_UPDATED_PACKAGE_JSON
