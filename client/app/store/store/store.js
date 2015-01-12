'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store',
        templateUrl: 'app/store/store/store.html',
        controller: 'StoreCtrl'
      });
  });