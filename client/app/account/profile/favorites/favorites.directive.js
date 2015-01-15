'use strict';

angular.module('stackStoreApp')
  .directive('favorites', function () {
    return {
      templateUrl: 'app/account/profile/favorites/favorites.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

      }
    };
  });
