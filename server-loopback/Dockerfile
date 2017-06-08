FROM garlictech2/server-common
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY *.json /app/

RUN scripts/install_dependencies && \
  npm cache clean --force

COPY . /app

RUN rm -f package.shared.json package.workflow.json