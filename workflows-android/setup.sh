#!/usr/bin/env bash
set -e
apt-get update
apt-get install -y --no-install-recommends apt-transport-https vim build-essential gradle

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
bash nodesource_setup.sh
rm nodesource_setup.sh
apt-get install -y nodejs yarn

apt-get autoremove -y
apt-get clean

yarn global add ionic cordova
yes | sdkmanager --licenses

echo "YARN version: $(yarn --version)"
echo "NODEJS version: $(nodejs --version)"
echo "ADB version: $(adb version --version)"
