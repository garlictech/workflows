. .env

docker run -i -t \
  -v $(pwd):/app/project \
  -e NPM_TOKEN \
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  garlictech2/workflows-library scripts/aws-docker-release-to-prod.sh
