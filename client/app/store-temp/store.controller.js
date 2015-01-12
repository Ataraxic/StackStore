'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth) {
    $scope.message = 'Hello';
    var Store = $resource('/api/store/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(data){
    	console.log(store);
    })

  });
