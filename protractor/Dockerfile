FROM webnicer/protractor-headless
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

RUN apt-get update && \
  apt-get install -y \
  x11vnc \
  ratpoison && \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN npm install -g typescript gulp

WORKDIR /protractor
COPY package.json ./
RUN npm install

COPY gulpfile.js /protractor/
RUN gulp webdriver_update

COPY protractor.sh /protractor.sh
COPY protractor.conf.js tsconfig.json /protractor/

ENTRYPOINT ["/protractor.sh"]