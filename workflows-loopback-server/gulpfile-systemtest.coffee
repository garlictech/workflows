gulp = require 'gulp'

config =
  root: "/app/test/system"
  src: ["server", "common"]
  dist: "/app/dist"

require('./gulp')(gulp, config)
return gulp
