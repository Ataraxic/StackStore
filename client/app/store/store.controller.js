'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams) {
    $scope.message = 'Hello';
    $scope.store = $stateParams.name;
    console.log($scope.store);
  });
