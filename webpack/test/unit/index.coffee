testContext = require.context '../../src', true, /unit-tests\..*$/
testContext.keys().forEach testContext
