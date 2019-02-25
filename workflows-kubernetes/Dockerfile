FROM garlictech2/base-image

COPY setup.sh /
RUN /setup.sh
ADD . /app
RUN rm -f /setup.sh package.shared.json package.workflow.json