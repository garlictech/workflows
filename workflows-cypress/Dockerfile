FROM cypress/base
WORKDIR /app

ENV NO_UPDATE_NOTIFIER 1
ENV CYPRESS_CACHE_FOLDER=/.cache

ADD package.json /app
RUN npm install
RUN ./node_modules/.bin/cypress verify
RUN chmod -R 777 /.cache
ADD . /app
RUN chmod +x /app/cypresstest.sh

WORKDIR /app/packages/package
ADD tsconfig.json /app/packages/package

ENTRYPOINT ["sh", "-c", "/app/cypresstest.sh"]
