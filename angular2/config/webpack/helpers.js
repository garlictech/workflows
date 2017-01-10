"use strict";
var path = require('path');
var _root = path.resolve('/app/project');
var fs = require('fs');

const isApp = !fs.existsSync('/app/project/dev-site');
const appEntryBase = path.join(path.sep, 'app', 'project', (isApp ? 'src' : 'dev-site'));

module.exports = {
  root: function(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
  },

  systemRoot: function(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, ['/app'].concat(args));
  },

  isCi: function() {
    return process.env.CI === 'true';
  },

  contentBase: function() {
    return path.join(appEntryBase, 'public');
  },

  appEntryBase: function() {
    return path.join(appEntryBase, 'app');
  },

  appEntrypoint: function() {
    return path.join(appEntryBase, 'main.ts');
  },

  appEntrypointProd: function() {
    return path.join(appEntryBase, 'main-ngc.ts');
  },

  isApp: function() {
    return isApp;
  },

  appCssPaths: function() {
    return [
      path.join(_root, 'src', 'app'),
      path.join(_root, 'dev-site')
    ]
  }
};
