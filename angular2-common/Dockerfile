FROM garlictech2/base-image
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN yarn global add coffee coffee-script bower

ADD package.json /app/

RUN yarn

COPY . /app

EXPOSE 8081 9876
CMD ["npm", "start"]
