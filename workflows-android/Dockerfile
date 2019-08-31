FROM azabost/android-sdk-28
WORKDIR /app

ENV NO_UPDATE_NOTIFIER 1
ENV NODE_OPTIONS "--max_old_space_size=8192"

COPY setup.sh /
RUN /setup.sh && \
  rm /setup.sh

ENV PATH ${PATH}:${ANDROID_HOME}/build-tools/28.0.3
