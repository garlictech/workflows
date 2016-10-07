chai = require 'chai'
GLOBAL.sinon = require 'sinon'
GLOBAL.should = chai.should()
GLOBAL.expect = chai.expect

GLOBAL.test =
  getMockClock: (dateString) ->
    if dateString then sinon.useFakeTimers(new Date(dateString).getTime()) else sinon.useFakeTimers()

