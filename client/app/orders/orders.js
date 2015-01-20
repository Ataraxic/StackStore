'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/orders/orders.html',
        controller: 'OrdersCtrl'
      });
  });