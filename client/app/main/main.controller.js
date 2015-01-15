'use strict';

angular.module('stackStoreApp')
    .controller('MainCtrl', function($scope, $http, socket, Store) {

        $scope.stores = [];

        Store.query({}).$promise
            .then(function(stores) {

                for (var i = 0; i < stores.length; i++) {

                    var store = {
                        title: stores[i].name,
                        link: '/store/' + stores[i].name
                    }
                    $scope.stores.push(store);
                    socket.syncUpdates('stores', $scope.stores);
                }
            })

        $scope.addThing = function() {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: $scope.newThing
            });
            $scope.newThing = '';
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });
    });