gulp = require 'gulp'

config =
  root: "/app/project"
  src: "server"

require('./gulp')(gulp, config)
return gulp
