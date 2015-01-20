'use strict';

angular.module('stackStoreApp')
  .directive('product', function (Product) {
    return {
      templateUrl: 'app/store-temp/directives/product/product.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope: true;
      },
      controller: function($scope,$modal,Auth){

        $scope.toggleDialog = function(product){
          var modalController = function($scope,Product,User,Comment){
            $scope.canAddReview=true; //this still needs work
            // console.log('auth',Auth.canAddReview(product._id));
            Product.getReviews({id: product._id},function(productWithReviews){
              $scope.modalProduct = productWithReviews;
              $scope.comments = productWithReviews.comments;
            });
            $scope.addReview = function(){
              var userId = Auth.getCurrentUser()._id;
              if (userId){
                var review = {
                  title: $scope.reviewTitle,
                  body: $scope.reviewBody,
                  owner: userId,
                  product: product._id,
                  upvotes: 0,
                  stars: $scope.reviewStars
                };
                Comment.create({},review,function(response){
                  console.log('this is the response from creating a commment',response);
                  $scope.comments.push(response);
                });
              } else {
                $scope.isNotLoggedIn = true;
              }
            };

            //Upvote Logic
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
          };
          var options = {
            templateUrl: '/app/store-temp/directives/product/modalTemplate.html',
            controller: modalController,
            windowClass: 'app-modal-window',
            size: 'lg'
          };
          var productModal = $modal.open(options);
        };
      }
    };
  });
