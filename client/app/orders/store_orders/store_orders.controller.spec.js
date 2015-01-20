'use strict';

describe('Controller: StoreOrdersCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var StoreCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreOrdersCtrl = $controller('StoreOrdersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
