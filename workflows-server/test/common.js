GLOBAL.chai = require('chai');
GLOBAL.sinon = require('sinon');
GLOBAL.should = chai.should();
GLOBAL.expect = chai.expect;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);

GLOBAL.test = {
  getMockClock: function (dateString) {
    if(dateString) {
      sinon.useFakeTimers(new Date(dateString).getTime());
    } else {
      sinon.useFakeTimers();
    }
  }
}
