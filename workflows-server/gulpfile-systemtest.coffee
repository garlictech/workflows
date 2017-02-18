gulp = require 'gulp'

config =
  root: "/app/test/system"
  src: "src"

require('./gulp')(gulp, config)
return gulp
