gulp = require 'gulp'

config =
  root: "/app/project"
  src: "server"

try require('./hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
