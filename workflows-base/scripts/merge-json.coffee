#! /usr/bin/env coffee
fs = require 'fs-extra'
merge = require 'merge'

pkg1 = fs.readJsonSync process.argv[2]
pkg2 = fs.readJsonSync process.argv[3]

console.log JSON.stringify merge.recursive(pkg1, pkg2), null, 2