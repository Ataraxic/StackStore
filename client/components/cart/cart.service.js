'use strict';

angular.module('stackStoreApp')
    .factory('Cart', function(socket, User, $http, Auth, localStorageService) {

        var user;
        var cart = {
            products: []
        };
        cart.products = JSON.parse(localStorageService.getItem('cart')) || []; //an arr of products objects

        if (Auth.isLoggedIn()) {
            user = Auth.getCurrentUser();
        }

        // Public API here
        return {
            get: function(callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    cart.products = user.cart;
                    $http.get('/api/users/' + user._id + '/populate')
                        .success(function(user) {
                            if(callback) callback(null, user);
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                }
            },
            add: function(productId, callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    $http.put('/api/users/' + user._id + '/cart', {
                            _id: productId
                        })
                        .success(function(user) {
                            cart.products = user.cart;
                            callback(null, cart);
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                } else {
                  cart.products.push(productId);
                  localStorageService.setItem('cart', JSON.stringify(cart.products));
                }
            },
            update: function() {
                return true;
            },
            delete: function() {
                return true;
            }
        };
    });
