FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json /app/

RUN scripts/install_dependencies deps.json

COPY . /app
