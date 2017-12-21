#! /usr/bin/env bash
. .env
tar -zcvf secrets.tgz tokens.env
travis encrypt-file secrets.tgz -r ${SCOPE}/${PROJECT}
