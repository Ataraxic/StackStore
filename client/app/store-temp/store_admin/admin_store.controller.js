'use strict';

angular.module('stackStoreApp')
  .controller('StoreAdminCtrl', function ($scope,$http,$location,Auth, $stateParams) {
    
     $scope.storeName = $stateParams.name;

     //Get Owner ID of current store

    $http.get('/api/stores/'+$scope.storeName).success(function(store) {
     $scope.ownerId= store.owner;
    });

      //Add a new product
      $scope.addProduct = function () {
        if($scope.name === '') {
          return;
        }
        if($scope.info === '') {
          return;
        }
        if($scope.price === '') {
          return;
        }

        $http.post('/api/products', {name:$scope.name, info: $scope.info, price: $scope.price, owner: $scope.ownerId, storeName: $scope.storeName})
        .success(function(product, status, headers, config) {
        //Update store with new product 

      }).
        error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //flash error
      });
        $scope.name = '';
        $scope.info = '';
        $scope.price = '';
    }


    //GET aLL PRODUCTS IN STORE -- WIP
    // $http.get('/api/stores/'+$scope.storeName+'/products').success(function(products) {
    // $scope.products = products; 
    // socket.syncUpdates('product', $scope.products);
    // });


    


  });
