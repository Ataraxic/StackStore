'use strict';

angular.module('stackStoreApp')
    .factory('Cart', function(socket, User, $http, Auth) {

        var user;
        var cart = {
            products: [],
            total: 0
        };

        if (Auth.isLoggedIn()) {
            user = Auth.getCurrentUser();
        }

        // Public API here
        return {
            get: function() {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    cart.products = user.cart;
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
