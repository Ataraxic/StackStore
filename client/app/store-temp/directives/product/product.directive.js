'use strict';

angular.module('stackStoreApp')
  .directive('product', function (Product) {
    return {
      templateUrl: 'app/store-temp/directives/product/product.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope: true;
      },
      controller: function($scope,$modal){

        $scope.toggleDialog = function(product){
          var modalController = function($scope,Product){
            Product.getReviews({id: product._id},function(productWithReviews){
              $scope.modalProduct = productWithReviews;
              $scope.comments = productWithReviews.comments;
              var addedFlag = 0;
              $scope.addUpvote = function(review){
                if (addedFlag===0){
                  review.upvotes +=1;
                  addedFlag=1;
                } else if (addedFlag===-1){
                  review.upvotes +=2;
                  addedFlag = 1;
                } else if (addedFlag===1){
                  review.upvotes-=1;
                  addedFlag = 0;
                }
              };
              $scope.minusUpvote = function(review){
                if (addedFlag===0){
                  review.upvotes -=1;
                  addedFlag = -1;
                } else if (addedFlag===1){
                  review.upvotes -=2;
                  addedFlag = -1;
                } else if (addedFlag===-1){
                  review.upvotes +=1;
                  addedFlag = 0;
                }
              };
            });
          };
          var options = {
            templateUrl: '/app/store-temp/directives/product/modalTemplate.html',
            controller: modalController,
            windowClass: 'app-modal-window'
          };
          var productModal = $modal.open(options);
        };
      }
    };
  });
