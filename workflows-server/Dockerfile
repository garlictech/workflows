FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

# The first 2 lines are a hack,it fixes an error but no idea why... remove it ASAP
RUN scripts/install_dependencies && \
  npm cache clean --force

COPY . /app

RUN rm -f package.shared.json package.workflow.json