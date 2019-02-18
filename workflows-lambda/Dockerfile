FROM garlictech2/workflows-library
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY package*.json /app/
RUN scripts/install_dependencies

COPY . /app

RUN rm -f package.shared.json package.workflow.json