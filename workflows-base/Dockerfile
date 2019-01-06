FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/
COPY setup.sh /
COPY .yarnrc /root

RUN /setup.sh && rm /setup.sh

ADD scripts/install_dependencies /app/scripts/

RUN scripts/install_dependencies && \
  rm -rf scripts && \
  yarn add commitizen

ADD scripts /app/scripts
ADD coffeelint.json tslint.json .editorconfig .prettierrc /app/
ADD hooks_workflow /app/hooks_workflow

RUN rm -f package.shared.json package.workflow.json && \
  echo "export PATH=/app/node_modules/.bin/:$PATH" >> $HOME/.bashrc
