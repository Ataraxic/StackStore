'use strict';

angular.module('stackStoreApp')
    .controller('NavbarCtrl', function($scope, $location, Auth, Store,Cart) {

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

       $scope.toggleNav = function (){
        	angular.element('#container').toggleClass('sidebar-closed');
        }
        $scope.toggleMsgDropdown = function (){
        	angular.element('#header_inbox_bar').toggleClass('open');
        }
        $scope.toggleCartDropdown = function (){
        	angular.element('#header_cart_bar').toggleClass('open');
        }

        Store.query({}).$promise
            .then(function(stores) {

                for (var i = 0; i < stores.length; i++) {
                    var storeName = stores[i].name;
                    var navItem = { title: stores[i].name, link: '/store/'+ stores[i].name};

                    $scope.menu.push(navItem);
                }
            });

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
        Cart.get(function(err, data) {
        	Cart.formatCartObj(data.cart);
        	$scope.cart_nav = data.cart;
        });

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
