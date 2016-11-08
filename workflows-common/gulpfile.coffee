gulp = require 'gulp'

config =
  root: "/app/project"
  src: "src"

try require('./project/hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
