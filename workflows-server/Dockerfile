FROM garlictech2/workflows-common
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY deps.json /app

RUN scripts/install_dependencies deps.json && \
  mv /app/gulp /app/gulp_common
  
COPY . /app
