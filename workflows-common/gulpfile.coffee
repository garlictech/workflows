gulp = require 'gulp'

config =
  root: "/app/project"
  src: "src"
  dist: "/app/project/dist"
  cssBundleName: 'style'

try require('./project/hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
