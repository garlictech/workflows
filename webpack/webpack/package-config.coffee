fs = require 'fs'
path = require 'path'
_ = require 'lodash'
require 'colors'

getPaths = (dirname, dist) ->
  src: path.join dirname, 'project/src'
  dist: path.join dirname, 'project', dist
  dev: path.join dirname, 'project/dev-site'
  node: path.join dirname, 'node_modules'
  bower: path.join dirname, 'bower_components'

module.exports = (dirname) ->
  packageConfig = JSON.parse(fs.readFileSync("#{dirname}/package.json", 'utf8'))
  dist = packageConfig.dist ? 'dist'
  PATHS = getPaths dirname, dist
  template = path.join PATHS.src, 'index.html'
  commonsName = 'commons'
  unittestName = 'unittest'
  contentBase = PATHS.src
  appType = packageConfig.garlic?.type

  if appType is 'module'
    template = path.join PATHS.dev, 'index.html'
    contentBase = PATHS.dev

  if not packageConfig.main?
    throw Error "Main field should be present in package.json"

  unittest = "./test/unit/index.coffee"

  moduleName: packageConfig.name ? throw Error "Name field should be present in package.json"
  main: "project/#{packageConfig.main}"
  template: template
  unittest: unittest
  commonChunksDisabled: packageConfig.webpack?.commonChunksDisabled ? false
  commonsName: commonsName
  commonsBundleName: "#{packageConfig.name}.#{commonsName}.bundle.js"
  unittestBundleName: "#{packageConfig.name}.#{unittestName}.bundle.js"
  contentBase: contentBase
  commons: _.keys packageConfig.dependencies
  PATHS: PATHS
  appType: appType
