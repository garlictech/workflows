#!make
include environment
export $(shell sed 's/=.*//' environment)

.PHONY:

print-environment:
	- cat environment

deploy:
	serverless deploy

start:
	serverless offline --webpack-use-polling --noTimeout

typedoc:
	typedoc /app/project/src --out /app/doc

prettier:
	prettier --config ./.prettierrc --write "project/src/**/*{.ts,.js,.json}"

prettier_check:
	prettier --config ./.prettierrc --list-different "project/src/**/*{.ts,.js,.json}"

unittest:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.unittest.js --forceExit --detectOpenHandles

unittest_ci:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.unittest.js --forceExit --detectOpenHandles --ci

alltest:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c project/config/jest.config.all.js --coverage $@ --forceExit --detectOpenHandles

alltest_ci:
	export NODE_OPTIONS=--max_old_space_size=4096
	jest -c src/config/jest.config.all.js --coverage $@ --forceExit --detectOpenHandles --ci && chmod -R 777 /app/artifacts

format_fix:
	cd /app/project && pretty-quick --staged
