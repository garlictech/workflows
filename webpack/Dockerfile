FROM docker.garlictech.com/garlictech-base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY ./package.json /

RUN cd / && \
  npm install coffee -g --silent && \
  npm install --silent

RUN mkdir /app 
WORKDIR /app

COPY . /app

VOLUME /app/src
VOLUME /app/dev-app
VOLUME /app/hooks

EXPOSE 8081
CMD ["npm", "run", "start:docker"]
