#!make
include .env
export $(shell sed 's/=.*//' .env)

DOCKER_IMAGE=${DOCKER_REGISTRY}/${PROJECT}-${DOCKER_IMAGE_SCOPE}
SYSTEMTEST_DOCKER_IMAGE=${DOCKER_SYSTEMTEST_REGISTRY}/${PROJECT}.systemtest

DOCKER_IMAGE_BASE=dontpushme/${PROJECT}-base
DEV_SERVICE_NAME=${PROJECT}.dev
DOCKER_COMPOSE_BASE = docker-compose -f docker/docker-compose.dependencies.yml -f docker/docker-compose.yml
SYSTEMTEST_SERVICE_NAME=${PROJECT}.systemtest.runner
DOCKER_COMPOSE = ${DOCKER_COMPOSE_BASE}
DOCKER_RUN = ${DOCKER_COMPOSE} run --service-ports --rm ${DEV_SERVICE_NAME}
DOCKER_RUN_NODEPS = ${DOCKER_COMPOSE} run --no-deps --rm ${DEV_SERVICE_NAME}
DOCKER_COMPOSE_PROD = docker-compose -f docker/docker-compose.prod.yml -f docker/docker-compose.dependencies.yml
DOCKER_COMPOSE_SYSTEMTEST = docker-compose -f docker/docker-compose.systemtest.base.yml -f docker/docker-compose.systemtest.${DOCKER_IMAGE_SCOPE}.yml
DOCKER_RUN_SYSTEMTEST = ${DOCKER_COMPOSE_SYSTEMTEST} run --service-ports --rm ${SYSTEMTEST_SERVICE_NAME}
DOCKER_COMPOSE_SERVER = ${DOCKER_COMPOSE} -f docker/docker-compose.server.yml
LOCAL_API_SERVER_DIST_BASE=artifacts/dist/src/lambda

.PHONY: build dist start unittest systemtest login bash docker-login docker-push test

build-base:
	if [ -f Dockerfile.common ]; then docker build --build-arg NPM_TOKEN=${NPM_TOKEN} -t ${DOCKER_IMAGE_BASE} -f Dockerfile.common . ; fi

# Build the development services.
build-container: build-base
	${DOCKER_COMPOSE} build

build-dist:
	${DOCKER_RUN_NODEPS} npm run build

# Build the development services.
build: build-container

build-all: clean
	-${DOCKER_COMPOSE} rm -f -v
	-docker rmi ${DOCKER_REGISTRY}/${PROJECT}
	-docker rmi ${DEV_SERVICE_NAME}
	-${DOCKER_COMPOSE} pull
	${DOCKER_COMPOSE_BASE} build --no-cache
	${DOCKER_RUN_NODEPS} npm run build

# Start the development server and the defined services. It also watches for file changes. In this case, it re-runs the unit tests and restarts the server.
start:
	${DOCKER_COMPOSE} up

# Stop the development server and the defined services.
stop:
	${DOCKER_COMPOSE} kill

start-l:
	serverless offline

clean:
	${DOCKER_RUN_NODEPS} npm run clean

unittest:
	${DOCKER_RUN_NODEPS} npm run unittest

unittest-ci:
	${DOCKER_RUN_NODEPS} npm run unittest:ci

unittest-watch:
	jest -c project/config/jest.config.unittest.js --watch

unittest-l:
	jest -c project/config/jest.config.unittest.js

alltest:
	${DOCKER_RUN_NODEPS} npm run test

alltest-l:
	jest -c project/config/jest.config.all.js --coverage

# Start bash in the development service
bash:
	${DOCKER_RUN_NODEPS} /bin/bash

# Login to the docker registry of the project
docker-login:
	scripts/docker-login.sh

lint:
	${DOCKER_RUN_NODEPS} npm run lint

lint-l:
	tslint --project project/config/tsconfig.json -c project/config/tslint.json --fix

lint-fix:
	${DOCKER_RUN_NODEPS} npm run lint:fix

lint-fix-l:
	tslint --project project/config/tsconfig.json -c project/config/tslint.json --fix

prettier:
	${DOCKER_RUN_NODEPS} npm run prettier

format-fix:
	pretty-quick --staged

doc:
	${DOCKER_RUN_NODEPS} npm run typedoc

# Kill the development server but let the other services run.
kill:
	${DOCKER_COMPOSE} kill ${DEV_SERVICE_NAME}

# Kill the development server but let the other services run.
kill-all:
	${DOCKER_COMPOSE} kill

deploy:
	${DOCKER_RUN_NODEPS} npm run deploy

remove:
	serverless remove

setup:
	echo "Updating package.json..."
	export DOCKER_CMD="scripts/cat-package-json.sh" && docker-compose -f docker/docker-compose.yml -f docker/docker-compose.cmd.yml run --no-deps -T ${PROJECT}.dev > package.json
	bit import --objects
	bit checkout ${npm_package_config_dockerWorkflowVersion} garlictech.infrastructure/workflow/base garlictech.infrastructure/workflow/nodejs garlictech.infrastructure/workflow/lambda
	chmod +x hooks/travis/* workflow/nodejs/docker/*.sh workflow/lambda/*.sh
