#!make
include environment
export $(shell sed 's/=.*//' environment)

.PHONY:

print-environment:
	- cat environment

deploy:
	serverless deploy

start:
	serverless offline