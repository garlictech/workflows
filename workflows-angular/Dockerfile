FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

# For jest watch... a workaround.
RUN git init

COPY package*.json angular.json /app/

RUN scripts/install_dependencies && \
  /app/node_modules/.bin/ng config -g cli.packageManager yarn && \
  /app/node_modules/.bin/ng add ng-cli-pug-loader

COPY . /app

RUN rm -f package.shared.json package.workflow.json

CMD ["npm", "start"]
