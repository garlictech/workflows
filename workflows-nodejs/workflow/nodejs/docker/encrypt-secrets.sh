#! /usr/bin/env bash
. .env
tar -zcvf secrets.tgz docker/tokens.prod.env
travis encrypt-file secrets.tgz -r pioneer-wst/camnjoy-providers
