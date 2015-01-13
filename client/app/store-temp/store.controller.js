'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth) {

    $scope.store = {};
    
    var Store = $resource('/api/store/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(data){
    	$scope.store = data;
    })

  });
