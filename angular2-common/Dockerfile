FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY package*.json /app/

RUN scripts/install_dependencies && \
  scripts/update-jsons.coffee && \
  npm cache clean --force && \
  rm -rf /tmp/*

COPY . /app

RUN rm -f package.shared.json package.workflow.json

EXPOSE 8081 9876
CMD ["npm", "start"]
