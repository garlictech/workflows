require 'angular-mocks'
chai.should()

module.exports =
  injectServices: (services...) ->
    obj = {}
    beforeEach ->
      inject ($injector) ->
        obj[s] =  $injector.get(s) for s in services
        return
      return
    return obj


  getCompiledElement: (html, directiveName) ->
    E = {}
    beforeEach inject ($rootScope, $compile) ->
      E.scope = $rootScope.$new()
      E.element = angular.element html
      E.template = $compile(E.element)(E.scope)
      if directiveName? then E.controller = E.element.controller directiveName
      E.scope.$digest()
      return
    return E

testContext = require.context '../../src', true, /unit-tests\..*$/
testContext.keys().forEach testContext