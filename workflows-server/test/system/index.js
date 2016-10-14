require('../common');
require('app-module-path').addPath("/app/project");
require("garlictech-common-server/dist/globals")(require('/app/project/dist/config'));
