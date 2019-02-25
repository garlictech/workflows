FROM garlictech2/workflows-nodejs

COPY *.json /app/
COPY setup.sh /
RUN /setup.sh
ADD . /app
RUN rm /setup.sh package.shared.json package.workflow.json