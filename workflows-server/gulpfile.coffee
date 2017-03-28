gulp = require 'gulp'

config =
  root: "/app/project"
  src: "server"
  dist: "/app/dist"
  
try require('./hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
