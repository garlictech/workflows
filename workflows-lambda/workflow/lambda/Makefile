#!make
include workflow/nodejs/Makefile
include .env
export $(shell sed 's/=.*//' .env)

start-l:
	serverless offline

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
