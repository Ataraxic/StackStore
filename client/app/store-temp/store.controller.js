'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth) {

    $scope.store = {};

    console.log($stateParams.name);

    var Store = $resource('/api/stores/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(data){
    	$scope.store = data;
    	console.log($scope.store);
    })

  });
