FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY package.json /app

RUN npm install -g coffee coffee-script gulp firebase-tools && \
  npm install && \
  echo "{}" > package.shared-prod.json

ADD hooks_workflow /app/hooks_workflow
ADD scripts /app/scripts
ADD coffeelint.json /app/
