'use strict';

angular.module('stackStoreApp')

.controller('StoreAdminCtrl', function($scope, $http, $location, Auth, $stateParams,User,Product,socket,Store) {

            $scope.owner = false;
            $scope.storeName = $stateParams.name;
            $scope.store = {};

            $scope.name = '';
            $scope.info = '';
            $scope.price = '';

            //Get Owner ID of current store
            var store = Store.get({
                name: $stateParams.name
            }, function(store) {
                User.get().$promise
                    .then(function(user) {
                        if (user._id === store.owner) {
                            $scope.owner = true;
                            $scope.store = store;
                        } else {
                            $location.path('/store/' + $stateParams.name);
                        }
                    })
            })

            //Add a new product
            $scope.addProduct = function() {
                if ($scope.name === '') {
                    return;
                }
                if ($scope.info === '') {
                    return;
                }
                if ($scope.price === '') {
                    return;
                }

                Product.save({
                	name: $scope.name,
                        info: $scope.info,
                        price: $scope.price,
                        owner: $scope.ownerId,
                        storeName: $scope.storeName
                },function(store){
                	console.log(store);
                	$scope.store = store;
                })

            }
});

