FROM garlictech2/base-image
MAINTAINER Garlic Tech Ltd. <contact@garlictech.com>

COPY *.json /app/

RUN npm install --unsafe-perm=true -g coffee coffeescript firebase-tools prettier && \
  npm install && \
  mkdir scripts  && \
  cd $HOME && \
  wget https://github.com/git-lfs/git-lfs/releases/download/v2.3.2/git-lfs-linux-amd64-2.3.2.tar.gz && \
  tar -xf git-lfs-linux-amd64-2.3.2.tar.gz && \
  cd git-lfs-2.3.2 && \
  ./install.sh && \
  rm ../git-lfs-linux-amd64-2.3.2.tar.gz && \
  apt-get update && \
  apt-get install -y --no-install-recommends zip python-pip python-dev build-essential && \
  pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic && \
  apt-get remove --purge -y python-pip python-dev build-essential && \
  apt-get autoremove -y && \
  apt-get clean

ADD scripts/install_dependencies /app/scripts/
RUN scripts/install_dependencies && \
  npm cache clean --force && \
  rm -rf scripts

ADD scripts /app/scripts
ADD coffeelint.json /app/
ADD hooks_workflow /app/hooks_workflow

RUN rm -f package.shared.json package.workflow.json