'use strict';

angular.module('stackStoreApp')
    .controller('NavbarCtrl', function($scope, $location, Auth, Store) {

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

        Store.query({}).$promise
            .then(function(stores) {
 
                for (var i = 0; i < stores.length; i++) {
                    var storeName = stores[i].name;
                    var navItem = { title: stores[i].name, link: '/store/'+ stores[i].name}
                  
                    $scope.menu.push(navItem);
                  
                }
            })

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });