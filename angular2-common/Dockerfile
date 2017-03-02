FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN npm install -g bower

COPY deps.json package.shared.json /app/

RUN scripts/merge-packages.sh && \
  npm install && \
  rm deps.json package.shared.json

COPY . /app

EXPOSE 8081 9876
CMD ["npm", "start"]
