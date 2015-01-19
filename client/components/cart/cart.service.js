'use strict';

angular.module('stackStoreApp')
    .factory('Cart', function(socket, User, $http, Auth, localStorageService) {

            var user;
            var cart = {
                ids: []
            };

            if (Auth.isLoggedIn()) {
                user = Auth.getCurrentUser();
            } else {
                cart.ids = localStorageService.get('cart') ? localStorageService.get('cart') : [];
            }

            function update(cart, callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    $http.put('/api/users/' + user._id + '/cart', {
                            action: 'update',
                            cart: cart
                        })
                        .success(function(user) {
                            get(function(err, user) {
                                callback(err, user);
                            });
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                }
            }

            function mergeCarts(cart, callback) {
                var newCart = [];
                if (localStorageService.get('cart').length > 0) {
                    cart.ids = localStorageService.get('cart');
                    cart.forEach(function(id) {
                        if (cart.ids.lastIndexOf(id) > -1) {
                            cart.ids.splice(cart.ids.lastIndexOf(id), 1);
                        }
                    })
                    newCart = cart.concat(cart.ids);
                    localStorageService.set('cart', []);
                update(newCart, function(err, user) {
                    if (err) console.log(err)
                    callback()
                })
            } else {
                callback();
            }
        }

        function formatCartObj(cart) {
            console.log(cart);
            var formatted;
            formatted = cart.reduce(function(prev, curr, index, array) {
                if (!prev[curr._id]) {
                    prev[curr._id] = curr;
                    prev[curr._id].quantity = 1;
                } else {
                    prev[curr._id].quantity += 1;
                }
                return prev;
            }, {});
            return formatted;
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
                if (localStorageService.get('cart').length > 0) {
                    mergeCarts(user.cart, function() {
                        $http.get('/api/users/' + user._id + '/populate')
                            .success(function(user) {
                                callback(null, user);
                            })
                            .error(function(err) {
                                console.log(err);
                                callback(err);
                            });
                    })
                } else {
                    $http.get('/api/users/' + user._id + '/populate')
                        .success(function(user) {
                            callback(null, user);
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                }
            } else {
                getProductsFromCache(function(err, products) {
                    if (err) console.log(err);
                    else {

                        var newCart = []

                        var formatted = cart.ids.reduce(function(prev, curr, index, arr) {
                            products.forEach(function(product) {
                                if (product._id == curr) {
                                    newCart.push(product);
                                }
                                return prev;
                            })
                        })
                        console.log(newCart);
                        callback(null, {
                            cart: newCart
                        });
                    }
                })
            }
        }

        // Public API here
        return {
            mergeCarts: mergeCarts,
            formatCartObj: formatCartObj,
            getProductsFromCache: getProductsFromCache,
            get: get,
            add: function(productId, callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    $http.put('/api/users/' + user._id + '/cart', {
                            _id: productId
                        })
                        .success(function(user) {
                            get(function(err, user) {
                                callback(err, user);
                            });
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                } else {
                    console.log(cart.ids);
                    cart.ids.push(productId);
                    localStorageService.set('cart', cart.ids);
                    get(function(err, data) {
                        callback(err, data);
                    });
                }
            },
            update: update,
            delete: function(productId, callback) {
                if (Auth.isLoggedIn()) {
                    user = Auth.getCurrentUser();
                    $http.put('/api/users/' + user._id + '/cart', {
                            action: 'remove',
                            _id: productId
                        })
                        .success(function(user) {
                            get(function(err, user) {
                                callback(err, user);
                            });
                        })
                        .error(function(err) {
                            console.log(err);
                            callback(err);
                        });
                } else {
                    console.log(cart.ids);
                    cart.ids.splice(cart.ids.lastIndexOf(productId), 1);
                    localStorageService.set('cart', cart.ids);
                    get(function(err, data) {
                        callback(err, data);
                    });
                }
            }
        };
    });
