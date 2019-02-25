FROM garlictech2/workflows-base
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY setup.sh /
COPY *.json /app/
COPY . /app
RUN /setup.sh
RUN rm -f /setup.sh package.shared.json package.workflow.json