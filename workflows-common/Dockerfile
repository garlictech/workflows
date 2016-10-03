FROM docker.garlictech.com/garlictech-base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY ./package.json /

RUN cd / && \
  npm install -g gulp coffee && \
  npm install && \
  rm /package.json

RUN mkdir /app
WORKDIR /app
COPY gulpfile.coffee /app
VOLUME /app

ENTRYPOINT ["gulp"]
