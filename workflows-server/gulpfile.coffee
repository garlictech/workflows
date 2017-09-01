gulp = require 'gulp'

config =
  root: "/app/project"
  src: ["server", "subrepos"]
  dist: "/app/dist"
  cssBundleName: 'style'

try require('./hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
