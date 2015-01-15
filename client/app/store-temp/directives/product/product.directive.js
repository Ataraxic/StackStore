'use strict';

angular.module('stackStoreApp')
  .directive('product', function (Product) {
    return {
      templateUrl: 'app/store-temp/directives/product/product.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope: true;
      }
    };
  });