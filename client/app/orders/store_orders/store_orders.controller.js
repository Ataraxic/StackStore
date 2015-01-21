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
          return order.storeOwner[0] == $scope.currentUser._id && order.buyerOrder; //buyerOrder not null on storeOwner orders, except in seed data
        }
        function calculateTotal(products) {
          var sum = 0;
          products.forEach(function(product){
            sum += product.price;
          })
          return sum.toFixed(2);
        }
        console.log('$scope.orderList pre filter', orderList)
        $scope.orderList = orderList.filter(isOwnerOrder);
        console.log('$scope.orderList after', $scope.orderList);
        $scope.orderList.forEach(function(order){
          order.createdTime = new Date(order.createdTime);
          order.total = calculateTotal(order.products); //need to apply promo discount if promo
          if(order.promoApplied) order.total = (order.total - (order.total * (order.promoApplied.discount/100))).toFixed(2);
        })
      })
      .catch(function(err){
        console.log('oh noooo:', err)
      })

    $scope.status = '';
    $scope.filterBy = function(keyword) {
      $scope.status = keyword;
    }
    var statuses = ['created', 'processing', 'cancelled', 'completed'];
    $scope.updateStatus = function(order) {
        if(order.statusUpdate && order.statusUpdate.toLowerCase() !== order.status.toLowerCase()) {
          if(statuses.indexOf(order.statusUpdate.toLowerCase()) < 0) {
            window.alert('Please enter either Created, Processing, Cancelled, or Completed');
          } else {
            order.status = order.statusUpdate.charAt(0).toUpperCase() + order.statusUpdate.slice(1);
            $http.put('/api/orders/' + order._id, order)
              .then(function(response){
                console.log('response.........', response.data)
                response.data.buyerOrder.status = order.statusUpdate;
                return $http.put('/api/orders/' + response.data.buyerOrder._id, response.data.buyerOrder)
              })
              .then(function(response){ //lol letting one storeowner update the buyerorder even if there might be more than one storeowner per order....
                console.log('response after updating buyerorder...', response.data)
              })
              .catch(function(err){
                console.log('err.........', err)
              })
          }
      }
    }

});

