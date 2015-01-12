'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store/{name}',
        templateUrl: 'app/store/store.html',
        controller: 'StoreCtrl'
      })
      .state('create_store', {
        url: '/store/create_store',
        templateUrl: 'app/store/create_store.html',
        controller: 'CreateStoreCtrl'
      });
  });