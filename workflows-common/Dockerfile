FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

ADD package.shared.json /app/
RUN scripts/install_dependencies package.shared.json

ADD deps.json /app/
RUN scripts/install_dependencies deps.json

COPY . /app
