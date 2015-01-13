'use strict';

angular.module('stackStoreApp')
  .controller('StoreAdminCtrl', function ($scope,$http,$location,Auth,$stateParams,$resource,User) {

  	$scope.owner = false;

   	var Store = $resource('/api/stores/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(store){
    	  	User.get().$promise
			  	.then(function(user){
			  		if(user._id === store.owner){
			  			$scope.owner = true;
			  		}
			  		else{
			  			$location.path('/store/'+$stateParams.name);
			  		}
			  	})
    })

    $scope.message = 'Hello';
    $scope.submit = function () {
    	$http.post('/store', {msg:'hello word!'}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $location.path('/store/'+data.name);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    //flash error
		  });
    }

  });
