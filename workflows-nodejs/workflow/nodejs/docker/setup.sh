#!/usr/bin/env bash
set -e
. .env

export DOCKER_CMD="scripts/cat-package-json.sh"
DOCKER_RUN_CMD="docker-compose -f docker/docker-compose.yml -f docker/docker-compose.cmd.yml run --no-deps -T ${PROJECT}.dev"
# /app/package_project.json is the package.json in this project, copied into the container.
echo "Updating package.json..."
${DOCKER_RUN_CMD} > package.json

for file in "tslint.json" "tsconfig.json" "jest-config.js" ".prettierrc" ".editorconfig" ".jshintrc" "webpack.config.js"; do
  echo "Updating $file..."
  export DOCKER_CMD="cat $file"
  ${DOCKER_RUN_CMD} > $file
done

yarn
