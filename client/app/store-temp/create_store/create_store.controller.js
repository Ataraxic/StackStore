'use strict';

angular.module('stackStoreApp')
  .controller('CreateStoreCtrl', function ($scope,$http,$location,Auth) {
    $scope.message = 'Hello';
    $scope.submit = function () {
    	//bad to do http calls in the controller
    	$http.post('/api/stores', {name:$scope.name}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(data);
		    $location.path('/store/'+data.name);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    //flash error
		  });
    }



  });
