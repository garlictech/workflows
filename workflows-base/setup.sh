#!/usr/bin/env bash
set -e
# Jest watch workaround
git init
npm install --unsafe-perm=true -g yarn
yarn global add bit-bin
yarn install
scripts/install_dependencies.js
echo "export PATH=/app/node_modules/.bin/:$PATH" >> $HOME/.bashrc

cd $HOME
wget https://github.com/git-lfs/git-lfs/releases/download/v2.3.2/git-lfs-linux-amd64-2.3.2.tar.gz
tar -xf git-lfs-linux-amd64-2.3.2.tar.gz
cd git-lfs-2.3.2
./install.sh
rm ../git-lfs-linux-amd64-2.3.2.tar.gz
