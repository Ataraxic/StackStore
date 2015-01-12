'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope,$http, socket,$stateParams,$resourceProvider) {
    $scope.message = 'Hello';
    var Store = $resource('/api/store/:name',{name:'@name'});

    var store = Store.get({name:$stateParams.name},function(){
    	console.log(store);
    })

  });
