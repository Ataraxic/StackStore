'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/orders/orders.html',
        controller: 'OrdersCtrl',
        authenticate: true
      })
      .state('store_orders', {
        url: '/store/{name}/orders',
        templateUrl: 'app/orders/store_orders/store_orders.html',
        controller: 'StoreOrdersCtrl',
        authenticate: true
      });
  });
