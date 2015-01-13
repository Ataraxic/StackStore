'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth,User) {
  	$scope.owner = false;
    $scope.store = {};

    $scope.ownerPresent = false;


    console.log($stateParams.name);

    var Store = $resource('/api/stores/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(store){
    	console.log(store);
    	  	User.get().$promise
			  	.then(function(user){
			  		console.log(user._id)
			  		console.log(store.owner)
			  		if(user._id == store.owner){
			  			$scope.owner = true;
			  		}
			  	})
    })

  });
