#!make
.PHONY: build dist start unittest systemtest login bash docker-login docker-push test

ANGULAR_PROJECT = ${COMPONENT:-default}
NG_SERVE = ng serve --hmr --host 0.0.0.0 --port 8081 --project ${ANGULAR_PROJECT}

start:
	${NG_SERVE}

start-poll:
	${NG_SERVE} --poll

start-aot:
	${NG_SERVE} --aot

start-prod:
	${NG_SERVE} --aot --prod

start-universal-debug:
	node artifacts/dist/server.js

# Build the development services.
build-container: build-base
	${DOCKER_COMPOSE_BASE} build

build-container-all:
	${DOCKER_COMPOSE_BASE} pull
	${DOCKER_COMPOSE_BASE} build --no-cache

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

unittest-l:
	jest -c src/jest.config.unittest.js

alltest:
	${DOCKER_RUN_NODEPS} npm run test

alltest-l:
	jest -c src/jest.config.all.js --coverage

# Start bash in the development service
bash:
	${DOCKER_RUN_NODEPS} /bin/bash

# Login to the docker registry of the project
docker-login:
	scripts/docker-login.sh

lint:
	${DOCKER_RUN_NODEPS} npm run lint

lint-l:
	# tslint --project project/config/tsconfig.json -c project/config/tslint.json --fix
	ng lint website
	ng lint admin
	ng lint features

lint-fix:
	${DOCKER_RUN_NODEPS} npm run lint:fix

lint-fix-l:
	# tslint --project project/config/tsconfig.json -c project/config/tslint.json --fix
	ng lint --fix features
	ng lint --fix website
	ng lint --fix admin

prettier:
	${DOCKER_RUN_NODEPS} npm run prettier

prettier-l:
	prettier --config ./.prettierrc --write \"src/**/*{.ts,.js,.json,.css,.scss}\"

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
