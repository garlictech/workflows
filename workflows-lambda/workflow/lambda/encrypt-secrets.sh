#! /usr/bin/env bash
. .env
tar -zcvf secrets.tgz claudia-configs/*-env docker/tokens.env
travis encrypt-file secrets.tgz -r ${SCOPE}/${PROJECT}
