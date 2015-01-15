'use strict';

angular.module('stackStoreApp')
    .factory('Cart', function(socket, User, $http, Auth, localStorageService) {

        var user;
        var cart = {
        		ids: [],
            products: []
        };

        // cart.ids = JSON.parse(localStorageService.getItem('cart')) || []; //an arr of products objects

        if (Auth.isLoggedIn()) {
            user = Auth.getCurrentUser();
        }

        function getProductsFromCache(callback) {
            $http.post('/api/products/cache', {
            	products:cart.ids
            })
                .success(function(products) {
                    if (callback) callback(null, products);
                })
                .error(function(err) {
                    console.log(err);
                    callback(err);
                });
        }

        // Public API here
        return {
        		getProductsFromCache: getProductsFromCache,
            get: function(callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    cart.products = user.cart;
                    $http.get('/api/users/' + user._id + '/populate')
                        .success(function(user) {
                            if (callback) callback(null, user);
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                }
                else{
                	getProductsFromCache(function(err,products){
                		if(err) console.log(err);
                		else{
                			callback(null,{products:products});
                		}
                	})
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
                		console.log(cart.ids);
                    cart.ids.push(productId);
                    localStorageService.setItem('cart', JSON.stringify(cart.ids));
                    callback();
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
