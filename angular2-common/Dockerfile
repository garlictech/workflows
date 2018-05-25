FROM garlictech2/workflows-base
MAINTAINER Zsolt MOLNAR <zsolt@zsoltmolnar.hu>

# Install Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  apt-get clean && \
  rm -rf /var/lib/apt/*

COPY package*.json /app/

RUN scripts/install_dependencies && \
  npm cache clean --force && \
  rm -rf /tmp/*

COPY . /app

RUN rm -f package.shared.json package.workflow.json

EXPOSE 8081 9876
CMD ["npm", "start"]
