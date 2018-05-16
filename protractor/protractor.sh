#!/bin/bash

Xvfb -screen 0 1280x1024x24 -ac &
export DISPLAY=:0 ratpoison

if [[ $DEBUG ]]; then
  x11vnc -nopw -display :0 -forever &
fi

gulp build
protractor $@

