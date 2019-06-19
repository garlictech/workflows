FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY setup.sh /
COPY *.json /app/
COPY . /app
RUN /setup.sh
COPY _env /app/.env
RUN rm -f /setup.sh package.shared.json package.workflow.json
