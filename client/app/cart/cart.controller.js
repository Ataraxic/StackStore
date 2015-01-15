'use strict';

angular.module('stackStoreApp')
    .controller('CartCtrl', function($scope, $resource, Auth, User, Store, Cart, Product, $location, $http) {
        $scope.message = 'Hello';

        Cart.get(function(err, data) {
        	$scope.cart_page = data.cart;
        });
    });
