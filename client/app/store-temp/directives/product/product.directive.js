'use strict';

angular.module('stackStoreApp')
  .directive('product', function (Product) {
    return {
      templateUrl: 'app/store-temp/directives/product/product.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        // scope: true;
      },
      controller: function($scope,$modal){
        $scope.toggleDialog = function(product){
          var options = {
            templateUrl: '/app/store-temp/directives/product/modalTemplate.html',
            windowClass: 'app-modal-window',
            controller: 'modalController',
            size: 'lg',
            resolve: {
              productId: function (){
                return product._id;
              }
            }
          };
          var productModal = $modal.open(options);
        };
      }
    };
  });
