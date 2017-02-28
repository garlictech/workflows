#! /usr/bin/env coffee
fs = require 'fs-extra'
remotePjson = fs.readJsonSync process.argv[2]
sharedDeps = fs.readJsonSync './package.shared-prod.json'

for key in ['dependencies', 'devDependencies']
  remotePjson[key] = Object.assign remotePjson[key], sharedDeps[key]

console.log JSON.stringify remotePjson, null, 2

