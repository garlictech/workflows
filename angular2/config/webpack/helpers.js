"use strict";
var path = require('path');
var _root = path.resolve('/app/project');

module.exports = {
  root: function(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
  },

  systemRoot: function(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, ['/app'].concat(args));
  }
};
