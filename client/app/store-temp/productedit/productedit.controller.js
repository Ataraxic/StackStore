'use strict';

angular.module('stackStoreApp')
    .controller('ProducteditCtrl', function($q, $scope, $http, $location, Auth, $stateParams, User, Product, socket, Store, Tags) {

        $scope.productId = $stateParams.product;
        $scope.name = null;
        $scope.price = null;
        $scope.description = null;

        Product.get({
            id: $scope.productId
        }, function(product) {
            $scope.product = product;
        })

        $scope.editProduct = function(productId) {

                // if ($scope.name === !null) {
                //        return;
                //    }
                //    if ($scope.price === !null) {
                //        return;
                //    }
                //    if ($scope.description === !null) {
                //        return;
                //    }

                if ($scope.name  && $scope.price && $scope.description) {
                    //Updating product in DB
                    Product.update({id: productId},{
                        name: $scope.name,
                        description: $scope.description,
                        price: $scope.price
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                } //END OF IF
                else if ($scope.name  && $scope.price && !$scope.description) {
                  Product.update({id: productId},{
                        name: $scope.name,
                        price: $scope.price
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                  else if ($scope.name  && !$scope.price && $scope.description) {
                  Product.update({id: productId},{
                        name: $scope.name,
                        // price: $scope.price,
                        description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                else if (!$scope.name  && $scope.price && $scope.description) {
                  Product.update({id: productId},{
                        // name: $scope.name,
                        price: $scope.price,
                        description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                else if ($scope.name  && !$scope.price && !$scope.description) {
                  Product.update({id: productId},{
                        name: $scope.name,
                        // price: $scope.price,
                        // description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                else if (!$scope.name  && !$scope.price && $scope.description) {
                  Product.update({id: productId},{
                        // name: $scope.name,
                        // price: $scope.price,
                        description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                else if (!$scope.name  && $scope.price && !$scope.description) {
                  Product.update({id: productId},{
                        // name: $scope.name,
                        price: $scope.price,
                        // description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                      // console.log('error is', err);

                        $scope.product = product;
                    })
                }
                else {
                  alert('wut');
                }



            } //END OF editProduct

    })