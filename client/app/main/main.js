'use strict';

angular.module('stackStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('tags', {
        url: '/tags/{tagname}',
        templateUrl: 'app/tags/tag.html',
        controller: 'TagsCtrl'
      });
  });