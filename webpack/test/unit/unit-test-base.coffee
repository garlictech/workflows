require 'angular'
require 'angular-mocks'
chai.should()

# This file is exported to the global scope under UnitTest.
module.exports =
  # Simplify injecting services. Example: let's inject and use MyModule.MyService, MyModule.MyOtherService
  #
  # S = UnitTest.injectServices "MyModule.MyService", "MyModule.MyOtherService"
  #
  # As you can see, you do not need beforeEach. Use the injection after angular mock!
  #
  # Usage:
  #
  # S["MyModule.MyService"].method()
  #
  # or:
  #
  # myService = null
  # S = UnitTest.injectServices "MyModule.MyService", "MyModule.MyOtherService"
  # beforeEach -> myService = S["MyModule.MyService"]
  # myService.method()
  #
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
