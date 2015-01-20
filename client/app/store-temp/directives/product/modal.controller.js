'use strict';

angular.module('stackStoreApp')
  .controller('modalController', function($scope,$modal,Auth,Product,User,Comment,productId){
    $scope.canAddReview=true; //this still needs work
      Product.getReviews({id: productId},function(productWithReviews){
        $scope.modalProduct = productWithReviews;
        $scope.comments = productWithReviews.comments;
        console.log("do they have a name",productWithReviews.comments);
      });

    //This contains the route that posts to server
    $scope.addReview = function(){
      var userId = Auth.getCurrentUser()._id;
      if (userId){
        var review = {
          title: $scope.reviewTitle,
          body: $scope.reviewBody,
          owner: userId,
          product: productId,
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
  });
