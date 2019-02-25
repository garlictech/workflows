#!/usr/bin/env bash

gulp build --gulpfile gulpfile-systemtest.js
echo "*******************************************************************************************************"
echo "* See the instructions at https://github.com/garlictech/workflows/blob/master/README.md#debug-execution"
echo "*******************************************************************************************************"
node --inspect-brk=0.0.0.0:9229 ./node_modules/.bin/gulp systemtest --gulpfile gulpfile-systemtest.js
