gulp = require 'gulp'

config =
  root: "/app/project"
  src: "src"

require('./gulp')(gulp, config)
return gulp
