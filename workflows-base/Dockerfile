FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

RUN npm install --unsafe-perm=true -g coffee coffee-script firebase-tools && \
  npm install && \
  mkdir scripts

ADD scripts/install_dependencies /app/scripts/
RUN scripts/install_dependencies && \
  npm cache clean --force && \
  rm -rf scripts

ADD hooks_workflow /app/hooks_workflow
ADD scripts /app/scripts
ADD coffeelint.json /app/

RUN rm -f package.shared.json package.workflow.json