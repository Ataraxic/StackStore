'use strict';

angular.module('stackStoreApp')
    .controller('StoreCtrl', function($scope, $http, socket, $stateParams, $resource, Auth, User, Store) {
        $scope.owner = false;
        $scope.store = {};

        $scope.ownerPresent = false;

        var store = Store.get({
            name: $stateParams.name
        }, function(store) {
            $scope.store = store;
            User.get().$promise
                .then(function(user) {
                    console.log(user._id)
                    console.log(store.owner)
                    if (user._id == store.owner) {
                        $scope.owner = true;
                    }
                })
        })

    });
