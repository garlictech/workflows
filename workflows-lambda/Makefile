#!make
include environment
export $(shell sed 's/=.*//' environment)
include Makefile.nodejs

.PHONY:

print-environment:
	- cat environment

deploy:
	serverless deploy

start:
	serverless offline --webpack-use-polling --noTimeout

