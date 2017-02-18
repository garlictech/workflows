global.chai = require('chai');
global.sinon = require('sinon');
global.should = chai.should();
global.expect = chai.expect;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);

global.test = {
  getMockClock: function(dateString) {
    if (dateString) {
      sinon.useFakeTimers(new Date(dateString).getTime());
    } else {
      sinon.useFakeTimers();
    }
  }
}