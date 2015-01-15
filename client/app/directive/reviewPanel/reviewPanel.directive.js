'use strict';

angular.module('stackStoreApp')
  .directive('reviewPanel', function () {
    return {
      templateUrl: 'app/directive/reviewPanel/reviewPanel.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
