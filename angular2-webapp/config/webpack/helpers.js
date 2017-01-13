"use strict";
var helpersCommon = require('./helpers-common');

var config = {
  appEntryBase: path.join(path.sep, 'app', 'project', 'src');
}

module.exports = helpersCommon(config);
