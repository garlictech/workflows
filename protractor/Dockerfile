FROM webnicer/protractor-headless
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

COPY setup.sh /tmp
RUN /tmp/setup.sh && rm /tmp/setup.sh
COPY protractor.sh /protractor.sh
