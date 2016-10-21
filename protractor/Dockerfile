FROM webnicer/protractor-headless
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && apt-get install -y \
    x11vnc \
    ratpoison \
  && rm -rf /var/lib/apt/lists/*


RUN cd / && \
  npm install -g --silent coffee && \
  npm install \
    chai \
    chai-as-promised \
    coffee-script \
    lodash \
    bluebird \
    request

ADD protractor.sh /protractor.sh
