'use strict';

angular.module('stackStoreApp')

.controller('StoreOrdersCtrl', function($q, $scope, $http, $location, Auth, $stateParams, User, Product, socket, Store, Tags) {

    $scope.owner = false;
    $scope.storeName = $stateParams.name;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.store = {};
    $scope.storeId = '';

    //Get Owner ID and storeId of current store
    User.get().$promise
        .then(function(user) {
            var store = Store.get({
                name: $stateParams.name
            }, function(store) {
                if (user._id === store.owner) {
                    $scope.owner = true;
                    $scope.store = store;
                    $scope.storeId = store._id;
                    $scope.ownerId = store.owner;
                } else {
                    $location.path('/store/' + $stateParams.name);
                }
            })
        })
        .then(null, function(err) {
            $location.path('/store/' + $stateParams.name);
        })

    //Retrieve all products in store and put them in scope
    Store.getProducts({
            name: $scope.storeName
        }).$promise
        .then(function(products) {
            $scope.products = products;
        })

    $http.get('/api/orders')
      .then(function(response){
        var orderList = response.data;
        function isOwnerOrder(order) {
          return order.storeOwner[0] == $scope.currentUser._id;
        }
        function calculateTotal(products) {
          var sum = 0;
          products.forEach(function(product){
            console.log('product curr', product)
            sum += product.price;
          })
          return sum.toFixed(2);
        }
        $scope.orderList = orderList.filter(isOwnerOrder);
        $scope.orderList.forEach(function(order){
          order.createdTime = new Date(order.createdTime);
          order.total = calculateTotal(order.products); //need to apply promo discount if promo
          if(order.promoApplied) order.total = (order.total - (order.total * (order.promoApplied.discount/100))).toFixed(2);
          console.log('order.total after', order.total)
        })
        console.log('orderList', $scope.orderList)
      })
      .catch(function(err){
        console.log('oh noooo:', err)
      })

    $scope.status = '';
    $scope.filterBy = function(keyword) {
      $scope.status = keyword;
    }
    var statuses = ['created', 'processing', 'cancelled', 'completed'];
    $scope.updateStatus = function() {
      // if(statuses.indexOf($scope.statusUpdate.toLowerCase())) {
      //   console.log('statusUpdate', $scope.statusUpdate);
      // }
    }

});

