FROM garlictech2/workflows-aws
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY package*.json /app/
RUN scripts/install_dependencies.js && \
  mv Makefile Makefile.nodejs

COPY . /app
COPY workflow/lambda/webpack.config.js /app/
RUN rm -f package.shared.json package.workflow.json
