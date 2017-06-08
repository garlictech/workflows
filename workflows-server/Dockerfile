FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

RUN scripts/install_dependencies && \
  npm cache clean --force

COPY . /app

RUN rm -f package.shared.json package.workflow.json