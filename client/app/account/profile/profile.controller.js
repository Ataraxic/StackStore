'use strict';

angular.module('stackStoreApp')
  .controller('ProfileCtrl', function ($scope,User,Auth,$stateParams) {
    $scope.name = $stateParams.username;
    User.getUserByName({id: $stateParams.username},function(user){
      $scope.favorites = user.favorites;
      $scope.comments = user.comments;
    });
    $scope.addUpvote = function(row){
      row.upvotes+=1;
    };
    $scope.minusUpvote = function(row){
      row.upvotes-=1;
    };
  });
