'use strict';

angular.module('stackStoreApp')
    .controller('StoreCtrl', function($location,$scope, $http, socket, $stateParams, $resource, Auth, User, Store,Cart) {

        $scope.owner = false;
        $scope.store = {};
        $scope.storeName = $stateParams.name;
        $scope.currentUser = Auth.getCurrentUser();
  
        $scope.ownerPresent = false;

        Cart.get(function(err,data){
        	
        });

        Store.get({
                name: $stateParams.name
            }).$promise
            .then(function(store) {
                $scope.store = store;

                console.log(store);
                User.get().$promise
                    .then(function(user) {
                        if (user._id === store.owner) {
                            $scope.owner = true;
                        }
                    })
            })
            .then(null, function(err) {
                $location.path('/');
            })

        $scope.addToCart = function(id) {
            Cart.add(id,function(err,data){
            	if(err) console.log(err);
            	console.log(data);
            })
        }

    });
