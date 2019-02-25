#!/usr/bin/env bash
set -e
apt-get update
apt-get install -y --no-install-recommends zip python-pip python-dev build-essential python-setuptools
pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic aws-sam-cli
apt-get remove --purge -y python-pip python-dev build-essential python-setuptools
apt-get autoremove -y
apt-get clean
scripts/install_dependencies.js