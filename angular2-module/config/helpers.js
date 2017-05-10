"use strict";
var path = require('path');
var helpersCommon = require('./helpers-common');

var config = {
  SITEROOT: path.resolve(__dirname, '..', 'dev-site'),
  SRCROOT: path.resolve(__dirname, '..', 'src', 'ngx'),
  DISTROOT: path.resolve(__dirname, '..', 'dist', 'ngx')
}

module.exports = helpersCommon(config);