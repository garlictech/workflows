require 'angular'
require 'angular-mocks'
chai.should()

testContext = require.context '../../project/src', true, /unit-tests\..*$/
testContext.keys().forEach testContext
