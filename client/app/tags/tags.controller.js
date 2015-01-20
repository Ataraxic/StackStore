'use strict';

angular.module('stackStoreApp')
    .controller('TagsCtrl', function($location, $scope, $http, socket, $stateParams, $resource, Auth, User, Tags, Store, Cart, Product) {

        $scope.currentTagName = $stateParams.tagname;
        $scope.tag = {};
        $scope.productsInTag = {};

        // These may not be necessary
        $scope.currentUser = Auth.getCurrentUser();
        $scope.currentPromos = [];
        $scope.ownerPresent = false;

        // Get current tag object
        Tags.search({
                id: $scope.currentTagName
            }).$promise
            .then(function(products) {
                $scope.products = products;
                 console.log('SCOPE.PRODUCTS IS', $scope.products);
            })
    });

