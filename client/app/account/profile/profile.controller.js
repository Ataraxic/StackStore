'use strict';

angular.module('stackStoreApp')
  .controller('ProfileCtrl', function ($scope,User,Auth,$stateParams,$modal) {
    $scope.name = $stateParams.username;
    User.getUserByName({id: $stateParams.username},function(user){
      $scope.isProfilePage = true;
      console.log("this is the user Object",user);
      $scope.favorites = user.favorites;
      $scope.comments = user.comments;
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
    });
    $scope.addUpvote = function(row){
      row.upvotes+=1;
    };
    $scope.minusUpvote = function(row){
      row.upvotes-=1;
    };
  });
