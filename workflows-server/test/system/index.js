require('../common');
require('app-module-path').addPath("/app/project");
var config = {};

try {
  config = require('/app/project/dist/config');
} catch (err) {}

require("garlictech-common-server/dist/globals")(config);
