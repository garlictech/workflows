require('source-map-support').install();
require('app-module-path').addPath('/app/dist');
var fs = require('fs');

if (fs.existsSync('/app/hooks/unittest/')) {
    console.log('Executing the unittest hooks...');
    require('/app/hooks/unittest/');
} else {
    console.log('There are no unittest hooks, skipping.');
}