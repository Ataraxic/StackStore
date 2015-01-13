'use strict';

angular.module('stackStoreApp')

.controller('StoreAdminCtrl', function($scope, $http, $location, Auth, $stateParams) {

						$scope.owner = false;
            $scope.storeName = $stateParams.name;

            //Get Owner ID of current store

            var Store = $resource('/api/stores/:name', {
                name: '@name'
            });

            var store = Store.get({
                name: $stateParams.name
            }, function(store) {
                User.get().$promise
                    .then(function(user) {
                        if (user._id === store.owner) {
                            $scope.owner = true;
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

                $http.post('/api/products', {
                        name: $scope.name,
                        info: $scope.info,
                        price: $scope.price,
                        owner: $scope.ownerId,
                        storeName: $scope.storeName
                    })
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

})
