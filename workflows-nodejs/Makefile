#!make
include .env
export $(shell sed 's/=.*//' .env)

.PHONY:

typedoc:
	- chmod -R 777 /app/artifacts
	- typedoc /app/project/src --out /app/artifacts/doc
	- chmod -R 777 /app/artifacts

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
	- chmod -R 777 /app/artifacts
	- export NODE_OPTIONS=--max_old_space_size=4096;\
  jest -c project/config/jest.config.all.js --forceExit --detectOpenHandles  --ci ;\
  EXIT_CODE=$$?;\
	chmod -R 777 /app/artifacts;\
	exit $$EXIT_CODE

format-fix:
	cd /app/project && pretty-quick --staged
