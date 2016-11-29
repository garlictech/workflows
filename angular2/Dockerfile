FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN mkdir /app 
WORKDIR /app
COPY ./package.json /app

RUN yarn global add coffee coffee-script bower --flat && \
  yarn install && \
  yarn cache clean

COPY . /app

EXPOSE 8081
ENV TERM=xterm
CMD ["npm", "run", "start:docker"]
