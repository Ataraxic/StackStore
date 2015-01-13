'use strict';

angular.module('stackStoreApp')
  .controller('ProductCtrl', function ($scope,$http, socket,$stateParams,$resource,Auth) {
     $scope.product = {};

    console.log($stateParams.name);

    var Product = $resource('/api/products/:id',{id:'@id'});

    var product = Product.get({id:$stateParams.id},function(data){
      $scope.product = data;
      console.log($scope.product);
    })



  });
