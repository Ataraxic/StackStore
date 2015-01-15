'use strict';

describe('Directive: reviewPanel', function () {

  // load the directive's module and view
  beforeEach(module('stackStoreApp'));
  beforeEach(module('app/directive/reviewPanel/reviewPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<review-panel></review-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the reviewPanel directive');
  }));
});