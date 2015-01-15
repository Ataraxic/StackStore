'use strict';

angular.module('stackStoreApp')
    .factory('Cart', function(socket, User, $http, Auth, localStorageService) {

        var user;
        var cart = {
            ids: []
        };

        cart.ids = JSON.parse(localStorageService.getItem('cart')) || []; //an arr of products objects

        if (Auth.isLoggedIn()) {
            user = Auth.getCurrentUser();
        }

        function getProductsFromCache(callback) {
            $http.post('/api/products/cache', {
                    products: cart.ids
                })
                .success(function(products) {
                    callback(null, products);
                })
                .error(function(err) {
                    console.log(err);
                    callback(err);
                });
        }

        function get(callback) {
            if (Auth.isLoggedIn()) {
                user = Auth.getCurrentUser();
                $http.get('/api/users/' + user._id + '/populate')
                    .success(function(user) {
                        if (callback) callback(null, user);
                    })
                    .error(function(err) {
                        console.log(err);
                        callback(err);
                    });
            } else {
                getProductsFromCache(function(err, products) {
                    if (err) console.log(err);
                    else {
                        callback(null, {
                            products: products
                        });
                    }
                })
            }
        }

        // Public API here
        return {
            getProductsFromCache: getProductsFromCache,
            get: get,
            add: function(productId, callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    $http.put('/api/users/' + user._id + '/cart', {
                            _id: productId
                        })
                        .success(function(user) {
                            callback(null, user);
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                } else {
                    console.log(cart.ids);
                    cart.ids.push(productId);
                    localStorageService.setItem('cart', JSON.stringify(cart.ids));
                    get(function(err,data){
                    	callback(err,data);
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
