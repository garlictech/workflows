require('../common');
require('app-module-path').addPath("/app/dist");
var config = {};

try {
  config = require('/app/dist/config');
} catch (err) {}