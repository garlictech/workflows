FROM garlictech2/workflows-base

COPY setup.sh /
RUN /setup.sh
ADD . /app
RUN rm /setup.sh package.shared.json package.workflow.json