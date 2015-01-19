'use strict';

describe('Directive: tags', function () {

  // load the directive's module and view
  beforeEach(module('stackStoreApp'));
  beforeEach(module('app/directive/tags/tags.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tags></tags>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tags directive');
  }));
});