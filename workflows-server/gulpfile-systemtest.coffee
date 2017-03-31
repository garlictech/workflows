gulp = require 'gulp'

config =
  root: "/app/project/"
  src: "test/system"
  dist: "/app/dist/test/system"

require('./gulp')(gulp, config)
return gulp
