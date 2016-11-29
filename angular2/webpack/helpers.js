/**
 * @author: @AngularClass
 */
"use strict";
var path = require('path');

// Helper functions
var ROOT = '/app';

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

function systemRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function projectRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [systemRoot('')].concat(args));
}

module.exports = {
  hasProcessFlag: hasProcessFlag,
  isWebpackDevServer: isWebpackDevServer,
  projectRoot: projectRoot,
  systemRoot: systemRoot
};
