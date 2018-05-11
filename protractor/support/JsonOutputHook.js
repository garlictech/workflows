var paths = require("../paths");

module.exports = function JsonOutputHook() {
    var Cucumber = require('cucumber');
    var JsonFormatter = Cucumber.Listener.JsonFormatter();
    var fs = require('fs');
    var path = require('path');

    JsonFormatter.log = function(json) {
        fs.writeFile(path.join(__dirname, '../' + paths.testResultJson), json, function(err) {
            if (err) throw err;
            console.log('json file location: ' + path.join(__dirname, '../' + paths.testResultJson));
        });
    };

    this.registerListener(JsonFormatter);
};