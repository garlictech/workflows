gulp = require 'gulp'

config =
  root: "/app/project"
  src: ["src"]
  dist: "/app/artifacts/dist"
  cssBundleName: 'style'

try require('./hooks/gulp') config
require('./gulp')(gulp, config)
return gulp
