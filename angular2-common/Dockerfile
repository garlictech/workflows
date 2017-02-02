FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN npm install -g --silent bower

ADD package.json package.shared.json /app/
RUN scripts/install_dependencies /app/package.shared.json

COPY . /app

EXPOSE 8081 9876
CMD ["npm", "start"]
