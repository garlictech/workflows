FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN npm install -g --silent coffee coffee-script bower

ADD package.json package.shared.json /app/
RUN scripts/install_dependencies /app/package.shared.json

COPY . /app

EXPOSE 8081 9876
CMD ["npm", "start"]
