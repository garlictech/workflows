WORKFLOWS="base-image workflows-base workflows-common angular2-common angular2-webapp angular2-module workflows-library workflows-server server-common"
# WORKFLOWS="base-image angular2-app-server angular2-common angular2-webapp angular2-module workflows-base workflows-common workflows-library workflows-server workflows-loopback-server server-common server-loopback protractor"

for i in $WORKFLOWS; do
  pushd $i
  ./build.sh
  popd
done
