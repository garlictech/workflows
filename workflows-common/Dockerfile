FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

RUN npm install --unsafe-perm=true -g gulp && \
  scripts/install_dependencies && \
  npm cache clean --force

COPY . /app

RUN rm -f package.shared.json package.workflow.json