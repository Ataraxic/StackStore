'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/store/{name}/product/{id}',
        templateUrl: 'app/products/product.html',
        controller: 'ProductCtrl'
      });      
  });