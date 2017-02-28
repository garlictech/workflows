#!/usr/bin/env bash

set -e

. scripts/deps-common.sh

scripts/merge-json.coffee $DEPS package.json > /tmp/package.json
scripts/merge-json.coffee $SHARED_PROD $SHARED > /tmp/package.shared-prod.json
scripts/merge-json.coffee /tmp/package.shared-prod.json /tmp/package.json > package.json
mv /tmp/package.shared-prod.json $SHARED_PROD
rm /tmp/package.json
