FROM garlictech2/base-image

ADD . /app
RUN  mv setup.sh / && /setup.sh
RUN rm /setup.sh package.shared.json package.workflow.json

ENV NODE_OPTIONS=--max_old_space_size=4096
