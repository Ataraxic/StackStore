'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth) {

    $scope.store = {};

    $scope.ownerPresent = false;


    console.log($stateParams.name);

    var Store = $resource('/api/stores/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(data){

    	console.log(data);
    	if(data.ownerPresent){
    		$scope.ownerPresent = true;
    		$scope.store = data.store;
    	}
    	else{
    		$scope.store = data;
    	}
    })

  });
