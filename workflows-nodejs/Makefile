#!make
include .env
export $(shell sed 's/=.*//' .env)

.PHONY:

typedoc:
	typedoc /app/project/src --out /app/doc

compile:
	gulp compile

build: compile

start:
	gulp

prettier:
	prettier --config ./.prettierrc --write "project/src/**/*{.ts,.js,.json}"

prettier-check:
	prettier --config ./.prettierrc --list-different "project/src/**/*{.ts,.js,.json}"

unittest:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.unittest.js --forceExit --detectOpenHandles

unittest-ci:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.unittest.js --forceExit --detectOpenHandles --ci

alltest:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.all.js --coverage --forceExit --detectOpenHandles

alltest-ci:
	chmod -R 777 /app/artifacts
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c src/config/jest.config.all.js --coverage --forceExit --detectOpenHandles --ci
	chmod -R 777 /app/artifacts

format-fix:
	cd /app/project && pretty-quick --staged
