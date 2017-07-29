FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

# The first 2 lines are a hack,it fixes an error but no idea why... remove it ASAP
RUN rm -rf package-lock.json node_modules && \
  npm install fs-extra lodash merge && \
  scripts/install_dependencies && \
  npm cache clean --force

COPY . /app

RUN rm -f package.shared.json package.workflow.json