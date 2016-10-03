fs = require 'fs'
path = require 'path'
_ = require 'lodash'
require 'colors'

getPaths = (dirname, dist) ->
  src: path.join dirname, 'src'
  dist: path.join dirname, dist
  dev: path.join dirname, 'dev-site'
  node: path.join dirname, 'node_modules'
  workflow_node: path.resolve "#{__dirname}/../node_modules"
  bower: path.join dirname, 'bower_components'

module.exports = (dirname) ->
  packageConfig = JSON.parse(fs.readFileSync("#{dirname}/package.json", 'utf8'))
  dist = packageConfig.dist ? 'dist'
  PATHS = getPaths dirname, dist
  template = path.join PATHS.src, 'index.html'
  commonsName = 'commons'
  unittestName = 'unittest'
  contentBase = PATHS.src

  if packageConfig.garlic?.type is 'module'
    template = path.join PATHS.dev, 'index.html'
    contentBase = PATHS.dev

  unittest = "./src/test/unit/test.coffee"

  moduleName: packageConfig.name ? throw Error "Name field should be present in package.json"
  main: packageConfig.main ? throw Error "Main field should be present in package.json"
  template: template
  unittest: unittest
  commonChunksDisabled: packageConfig.webpack?.commonChunksDisabled ? false
  commonsName: commonsName
  commonsBundleName: "#{packageConfig.name}.#{commonsName}.bundle.js"
  unittestBundleName: "#{packageConfig.name}.#{unittestName}.bundle.js"
  contentBase: contentBase
  commons: _.keys packageConfig.dependencies
  PATHS: PATHS
