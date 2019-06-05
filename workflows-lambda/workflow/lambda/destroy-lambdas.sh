#!/usr/bin/env bash
set -e

read -p "Are you sure you want to delete the lambda functions? " -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
  $(dirname $0)/deploy-lambdas.sh destroy $@
fi
