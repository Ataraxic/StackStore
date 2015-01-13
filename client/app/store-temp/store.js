'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store/{name}',
        templateUrl: 'app/store-temp/store.html',
        controller: 'StoreCtrl'
      })
      .state('store_admin', {
        url: '/store/{name}/admin',
        templateUrl: 'app/store-temp/store_admin/store_admin.html',
        controller: 'StoreAdminCtrl'
      })
      .state('create_store', {
        url: '/store/create_store',
        templateUrl: 'app/store-temp/create_store/create_store.html',
        controller: 'CreateStoreCtrl'
      });
  });