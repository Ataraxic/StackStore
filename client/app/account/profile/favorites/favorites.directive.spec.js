'use strict';

describe('Directive: favorites', function () {

  // load the directive's module and view
  beforeEach(module('stackStoreApp'));
  beforeEach(module('app/account/profile/favorites/favorites.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<favorites></favorites>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the favorites directive');
  }));
});