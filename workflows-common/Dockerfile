FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

RUN yarn global add coffee coffee-script gulp

COPY deps.json /app

RUN scripts/install_dependencies deps.json

COPY . /app
