FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

# For jest watch... a workaround.
RUN git init

COPY package*.json angular.json /app/

RUN scripts/install_dependencies && \
  npm install -g @angular/cli && \
  ng add ng-cli-pug-loader

COPY . /app

RUN rm -f package.shared.json package.workflow.json angular.json ng-add-pug-loader.js

CMD ["npm", "start"]
