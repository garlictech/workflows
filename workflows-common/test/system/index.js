require('source-map-support').install();
require('app-module-path').addPath('/app/dist');

var fs = require('fs');

if (fs.existsSync('/app/hooks/systemtest')) {
    console.log('Executing the systemtest hooks...');
    require('/app/hooks/systemtest');
} else {
    console.log('There are no systemtest hooks, skipping.');
}