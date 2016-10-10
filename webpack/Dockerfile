FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN mkdir /app 
WORKDIR /app
COPY ./package.json /app

RUN npm install coffee bower -g --silent && \
  npm install

COPY . /app
RUN mv /app/package.json /app/package_internal.json

VOLUME /app/src
VOLUME /app/dev-app
VOLUME /app/hooks
VOLUME /app/dist

EXPOSE 8081
CMD ["npm", "run", "start:docker"]
