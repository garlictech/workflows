#! /usr/bin/env bash
. .env
echo "Logging in to docker..."
$(aws ecr get-login --region us-east-1 | sed 's/-e none//g')