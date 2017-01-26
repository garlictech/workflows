"use strict";
var path = require('path');
var _root = path.resolve('/app/project');

module.exports = function(config) {
  return {
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
      return path.join(config.appEntryBase, 'public');
    },

    appEntryBase: function() {
      return path.join(config.appEntryBase, 'app');
    },

    appEntrypoint: function() {
      return path.join(config.appEntryBase, 'main.ts');
    },

    appEntrypointProd: function() {
      return path.join(config.appEntryBase, 'main-ngc.ts');
    },

    appCssPaths: function() {
      return [
        path.join(_root, 'src', 'app'),
        path.join(_root, 'dev-site')
      ]
    },

    devHookFile: function() {
      return path.join(_root, 'hooks', 'webpack', 'webpack.dev.js');
    },

    prodHookFile: function() {
      return path.join(_root, 'hooks', 'webpack', 'webpack.prod.js');
    },

    testHookFile: function() {
      return path.join(_root, 'hooks', 'webpack', 'webpack.test.js');
    },

    karmaHookFile: function() {
      return path.join(_root, 'hooks', 'karma', 'karma.conf.js');
    }
  };
}