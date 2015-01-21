'use strict';

angular.module('stackStoreApp')
    .controller('MainCtrl', function($scope, $http, socket, Store, Tags) {

        $scope.stores = [];
        $scope.products = [];
        $scope.tags = [];

        //Get all stores
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

          //Get all tags
        Tags.query({}).$promise
            .then(function(tags) {

                for (var i = 0; i < tags.length; i++) {

                    var tag = {
                        title: tags[i].name,
                        link: '/tags/' + tags[i].name
                    }
                    $scope.tags.push(tag);
                    socket.syncUpdates('tags', $scope.tags);
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

        $scope.searchStore = function(){
          $scope.products = []
          if ($scope.searchText){
            Store.searchAll({name:'store'},{searchtext:$scope.searchText},function(res){
              if (res.data){
                var productsArray = res.data;
                productsArray.forEach(function(product){
                  console.log('product', product)
                  if(!(exist(product))) $scope.products.push(product);
                })
                $scope.products.length == 0 ? $scope.noProds = true : $scope.noProds = false;
              } else {
                $scope.noProds = true;
              }
            });
          }
        };

        function exist(prod) {
          var exist = false;
          $scope.products.forEach(function(product){
            if(prod._id == product._id) {
              exist = true;
            }
          });
          return exist;
        }
    });
