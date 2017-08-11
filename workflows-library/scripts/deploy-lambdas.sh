#!/usr/bin/env bash
set -e
cd project

function cleanup {
  echo "Cleaing up..."
  if [ -d node_modules.bak ]
  then
    mv node_modules.bak node_modules
  fi
}

trap cleanup $?

if [ -d node_modules ]
then
  mv node_modules node_modules.bak
fi

# mkdir tmp
# cd tmp
# cp -r /app/project/dist .
# cp /app/project/package.json .
# cp -r /app/project/claudia-configs .
# mkdir project
# cp -r /app/project/project/src ./project/

if [ -f scripts/deploy-lambdas.sh ]
then
  scripts/deploy-lambdas.sh
else
  echo -e "\033[0;31mscripts/deploy-lambdas.sh is missing, cannot deploy lambdas!\033[m"
  echo
  exit 1
fi

cleanup