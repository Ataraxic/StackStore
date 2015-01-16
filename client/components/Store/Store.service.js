'use strict';

angular.module('stackStoreApp')
    .factory('Store', function($resource) {
        return $resource("/api/stores/:name/:controller", {
            name: '@name'
        }, {
            update: {
                method: 'put'
            },
            search: {
                method: 'POST',
                params: {
                    controller: 'search'
                }
            },
            getProducts: {
                method: 'GET',
                params: {
                    controller: 'getproducts'
                },
                isArray : true
            }
        });
    });

// Product.get({
//  _id: "132131313241"
// });

// Product.save({
//  _id: 123123123123
//  name: "tst"
// });

// Product.update({
//  // asdasdas
// });


// /api/products/1231234123213

// req.body = {
//  _id: 2312312312313,
//  name: "test"
// }