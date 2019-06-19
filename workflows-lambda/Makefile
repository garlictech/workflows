#!make
include Makefile.nodejs
include .env
export $(shell sed 's/=.*//' .env)

.PHONY:

print-environment:
	- cat environment

deploy:
	serverless deploy

start:
	serverless offline --webpack-use-polling --noTimeout

