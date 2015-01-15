'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:username',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });