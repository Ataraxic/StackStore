'use strict';

angular.module('stackStoreApp')
    .controller('CartCtrl', function($scope, $resource, Auth, User, Store, Cart, Product, $location, $http) {
        $scope.message = 'Hello';
        $scope.cart_page;

        $scope.addQuantity = function (id) {
        	Cart.add(id,function(err,data){
        		$scope.cart_page = Cart.formatCartObj(data.cart)
        	})
        }

        $scope.subtractQuantity = function (id) {
        	console.log(id);
        	Cart.delete(id,function(err,data){
        		console.log(Cart.formatCartObj(data.cart));
        		$scope.cart_page = Cart.formatCartObj(data.cart)
        	})
        }

        Cart.get(function(err, data) {
        	console.log(data);
        	$scope.cart_page = Cart.formatCartObj(data.cart)
        });
    });
