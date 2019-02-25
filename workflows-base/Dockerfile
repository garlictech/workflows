FROM garlictech2/base-image

ADD . /app
RUN  mv setup.sh / && /setup.sh
RUN rm /setup.sh package.shared.json package.workflow.json
