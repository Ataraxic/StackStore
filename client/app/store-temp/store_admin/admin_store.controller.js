'use strict';

angular.module('stackStoreApp')
  .controller('StoreAdminCtrl', function ($scope,$http,$location,Auth,$stateParams) {
  	Auth.isStoreOwner($stateParams.name,function(isOwner){
  		if(!isOwner) $location.path('/store/'+$stateParams.name);
  	});

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
