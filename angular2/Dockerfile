FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN mkdir -p /app && \
  yarn global add coffee coffee-script bower

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn

COPY . /app

EXPOSE 8081 9876
CMD ["npm", "start"]
