#!/usr/bin/env bash

gulp build --gulpfile gulpfile-systemtest.coffee
gulp systemtest --gulpfile gulpfile-systemtest.coffee