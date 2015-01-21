'use strict';

angular.module('stackStoreApp')
    .controller('ProducteditCtrl', function($q, $scope, $http, $location, Auth, $stateParams, User, Product, socket, Store, Tags) {

        $scope.productId = $stateParams.product;
        $scope.name = null;
        $scope.price = null;
        $scope.description = null;

        //Get Product
        Product.get({
            id: $scope.productId
        }, function(product) {
            $scope.product = product;
        })

        //Get all tag objects for product
        Tags.query({
            name: $scope.productId
        }, function(tags) {
            $scope.tags = tags;
        })

        $scope.addTag = function(name) {
            console.log('hitting?')
            Tags.save({
                id: name
            }, function(tag) {
                    var index = 0;
                    for (var i = 0; i < $scope.tags.length; i++) {
                        if ($scope.tags[i].name == name) {return;}
                        else {$scope.tags.push(tag)} 
                    } //end of for loop
                })
        }

        $scope.deleteProduct = function(id) {
            Product.remove({
                id: id
            }, function(deleted) {
                if (deleted) {

                    $scope.product = null;
                }
            })
        }

        $scope.deleteTag = function(id) {
            Tags.remove({
                id: id
            }, function(deleted) {
                if (deleted) {
                    var index = 0;
                    for (var i = 0; i < $scope.tags.length; i++) {
                        if ($scope.tags[i]._id == id) {
                            index = i;
                        } //end of inner if
                    } //end of for loop
                    $scope.tags.splice(index, 1);
                } //end of outer if
            })
        }

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

                if ($scope.name && $scope.price && $scope.description) {
                    //Updating product in DB
                    Product.update({
                        id: productId
                    }, {
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
                else if ($scope.name && $scope.price && !$scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        name: $scope.name,
                        price: $scope.price
                            // tags: $scope.tagObjects,
                            // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else if ($scope.name && !$scope.price && $scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        name: $scope.name,
                        // price: $scope.price,
                        description: $scope.description
                            // tags: $scope.tagObjects,
                            // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else if (!$scope.name && $scope.price && $scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        // name: $scope.name,
                        price: $scope.price,
                        description: $scope.description
                            // tags: $scope.tagObjects,
                            // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else if ($scope.name && !$scope.price && !$scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        name: $scope.name,
                        // price: $scope.price,
                        // description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else if (!$scope.name && !$scope.price && $scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        // name: $scope.name,
                        // price: $scope.price,
                        description: $scope.description
                            // tags: $scope.tagObjects,
                            // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else if (!$scope.name && $scope.price && !$scope.description) {
                    Product.update({
                        id: productId
                    }, {
                        // name: $scope.name,
                        price: $scope.price,
                        // description: $scope.description
                        // tags: $scope.tagObjects,
                        // media: $scope.product_images,
                    }).$promise.then(function(product) {
                        // console.log('error is', err);

                        $scope.product = product;
                    })
                } else {
                    alert('wut');
                }



            } //END OF editProduct

    })