FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY setup.sh /
COPY *.json /app/
RUN /setup.sh
COPY . /app

RUN mv _env /app/.env && \
  rm -f /setup.sh package.shared.json package.workflow.json
