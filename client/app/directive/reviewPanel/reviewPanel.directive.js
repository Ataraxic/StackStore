'use strict';

angular.module('stackStoreApp')
  .directive('reviewPanel', function (Product) {
    return {
      templateUrl: 'app/directive/reviewPanel/reviewPanel.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
         scope: true;
      }
    };
  });
