"use strict";
var path = require('path');
var helpersCommon = require('./helpers-common');

var config = {
    SITEROOT: path.resolve(__dirname, '..', 'src'),
    AOT: true
}

module.exports = helpersCommon(config);