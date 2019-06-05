#! /usr/bin/env bash
. .env
eval $(make docker-tag | awk '/./{line=$0} END{print line}')