gulp = require 'gulp'

config =
  root: "/app/project/"
  src: "test/system"
  dist: "/app/artifacts/dist/"

require('./gulp')(gulp, config)
return gulp
