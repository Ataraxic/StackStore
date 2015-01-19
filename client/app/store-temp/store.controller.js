'use strict';

angular.module('stackStoreApp')
    .controller('StoreCtrl', function($location,$scope, $http, socket, $stateParams, $resource, Auth, User, Store,Cart, Product) {

        $scope.owner = false;
        $scope.store = {};
        $scope.storeName = $stateParams.name;
        $scope.currentUser = Auth.getCurrentUser();
        $scope.products = {};

        $scope.ownerPresent = false;

        Cart.get(function(err,data){
        });


        // Find store object, set scope.store and scope.owner variables.
        Store.get({
                name: $stateParams.name
            }).$promise
            .then(function(store) {
                $scope.store = store;
                $scope.store.products = [];
                User.get().$promise
                    .then(function(user) {
                        if (user._id === store.owner) {
                            $scope.owner = true;
                            $scope.ownerPresent = true;
                        }
                    });
            })
            .then(null, function(err) {
                $location.path('/');
            });


        //Get all products in store
        Store.getProducts({name: $scope.storeName}).$promise
            .then(function(products) {
                $scope.products = products;
                // console.log('THERE SHOULD BE NO PRODS -->',$scope.products);
            })

        $scope.addToCart = function(id) {
            Cart.add(id,function(err,data){
            	if(err) console.log(err);
            	console.log(data);
            })
        }
        $scope.searchStore = function(){
          $scope.store.products = []
          if ($scope.searchText){
            Store.search({'name':$stateParams.name},{searchtext:$scope.searchText},function(res){
              if (res.data){
                var productsArray = res.data;
                productsArray.forEach(function(product){
                  if(product.storeId == $scope.store._id && !(exist(product))) $scope.store.products.push(product);
                })
                // $scope.store.products = productsArray;
                $scope.noProds = false;
              } else {
                $scope.noProds = true;
              }
            });
          }
        };

        function exist(prod) {
          var exist = false;
          $scope.store.products.forEach(function(product){
            if(prod._id == product._id) {
              exist = true;
            }
          });
          return exist;
        }
    });
