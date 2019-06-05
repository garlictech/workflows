#! /usr/bin/env bash

export RETHINKDB_USER=admin
export RETHINKDB_PASSWORD=`aws ssm get-parameters --names RETHINKDB_PASSWORD --with-decryption --region us-east-1 --output text --output text | awk '{print $4}'`
export DEEPSTREAM_CONNECTION=wss://deepstream-cluster.camnjoy.com/deepstream
export DEEPSTREAM_PROVIDER_JWT_SECRET=`aws ssm get-parameters --names DEEPSTREAM_PROVIDER_JWT_SECRET --with-decryption --region us-east-1 --output text --output text | awk '{print $4}'`
export DEEPSTREAM_USER_JWT_SECRET=$DEEPSTREAM_PROVIDER_JWT_SECRET
export RETHINKDB_DATABASE=deepstream
export RETHINKDB_HOST=gw01.camnjoy.com
export RETHINKDB_PORT=28014
export TEST_TIMEOUT=2000000

docker run  -e RETHINKDB_USER -e RETHINKDB_PASSWORD -e DEEPSTREAM_CONNECTION -e DEEPSTREAM_PROVIDER_JWT_SECRET -e DEEPSTREAM_USER_JWT_SECRET -e RETHINKDB_DATABASE -e RETHINKDB_HOST -e RETHINKDB_PORT -e TEST_TIMEOUT docker-aws.camnjoy.com/camnjoy-deepstream-providers.systemtest:latest