'use strict';

angular.module('stackStoreApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:option', {
      id: '@_id'
      },
      {
    	update: {
    		method: 'put'
    	},
      getUserByName: {
        method: 'GET',
        params: {
          option: 'reviews'
        }
      }
    });
  });

// Product.get({
// 	_id: "132131313241"
// });

// Product.save({
// 	_id: 123123123123
// 	name: "tst"
// });

// Product.update({
// 	// asdasdas
// });


// /api/products/1231234123213

// req.body = {
// 	_id: 2312312312313,
// 	name: "test"
// }
