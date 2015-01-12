'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store/{name}',
        templateUrl: 'app/store/store.html',
        controller: 'StoreCtrl'
      });
  });