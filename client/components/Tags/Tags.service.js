'use strict';

angular.module('stackStoreApp')
  .factory('Tags', function ($resource) {

    return $resource("/api/tags/:id/:option", { id: '@id'}, {
      update: {
        method: 'put'
      },
      search: {
                method: 'GET',
                isArray: true,
                params: {
                  option: 'byname'
                }
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