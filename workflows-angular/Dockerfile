FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

# For jest watch... a workaround.
RUN git init

COPY package*.json /app/

RUN scripts/install_dependencies && \
  npm cache clean --force && \
  rm -rf /tmp/*

COPY . /app

RUN rm -f package.shared.json package.workflow.json

EXPOSE 8088 8000 5000 8092

