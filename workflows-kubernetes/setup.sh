#!/usr/bin/env bash
set -e
apt-get update
apt-get install -y --no-install-recommends apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
touch /etc/apt/sources.list.d/kubernetes.list
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list
apt-get update
apt-get install -y --no-install-recommends kubectl
apt-get autoremove -y
apt-get clean
mkdir -p $HOME/.kube
