#!make
include environment
export $(shell sed 's/=.*//' environment)

.PHONY:

# Build the development services.
create-bucket:
	aws s3api create-bucket --bucket ${LAMBDA_DEPLOY_S3_BUCKET} --region ${AWS_REGION}

print-environment:
	- cat environment

deploy-lambda-stack:
	scripts/deploy-stack.js