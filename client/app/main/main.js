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
        templateUrl: 'app/directive/tags/tags.html',
        controller: 'TagsCtrl'
      });
  });