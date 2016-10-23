FROM webnicer/protractor-headless
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN cd / && \
  npm install -g --silent coffee && \
  npm install --silent \
    chai \
    chai-as-promised \
    bluebird \
    request \
    coffee-script && \
  npm cache clean
