'use strict';

angular.module('stackStoreApp')
    .controller('OrdersCtrl', function($location,$scope, $http, socket, $stateParams, $resource, Auth, User, Store,Cart, Product) {

        $scope.owner = false;
        $scope.store = {};
        $scope.storeName = $stateParams.name;
        $scope.currentUser = Auth.getCurrentUser();
        $scope.products = {};
        $scope.currentPromos = [];
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

            });

        $http.get('/api/orders')
        .then(function(response){
          var orderList = response.data;
          function isUserOrder(order) {
            return order.buyer == $scope.currentUser._id && order.buyerOrder == null;
          }
          function calculateTotal(products) {
            var sum = 0;
            products.forEach(function(product){
              sum += product.price;
            })
            return sum.toFixed(2);
          }
          $scope.orderList = orderList.filter(isUserOrder);
          $scope.orderList.forEach(function(order){
            order.createdTime = new Date(order.createdTime);
            order.total = calculateTotal(order.products); //need to apply promo discount if promo
            if(order.promoApplied) order.total = (order.total - (order.total * (order.promoApplied.discount/100))).toFixed(2);
          })
        })
        .catch(function(err){
          console.log('oh noooo:', err)
        })

        // //Get all products in store
        // Store.getProducts({name: $scope.storeName}).$promise
        //     .then(function(products) {
        //       console.log("poplated Products?",products);
        //         $scope.products = products;
        //     })
    });
