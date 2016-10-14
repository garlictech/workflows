FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN mkdir /app 
WORKDIR /app
COPY ./package.json /app

RUN npm install coffee bower -g --silent && \
  npm install

COPY . /app
RUN mv /app/package.json /app/package_internal.json

EXPOSE 8081
ENV TERM=xterm
CMD ["npm", "run", "start:docker"]
