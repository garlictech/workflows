gulp = require 'gulp'

config =
  root: "/app/project/test/system"
  src: "src"

require('./gulp')(gulp, config)
return gulp
