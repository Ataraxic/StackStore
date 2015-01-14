'use strict';

angular.module('stackStoreApp')
  .controller('ProfileCtrl', function ($scope,User,Auth,$stateParams) {
    $scope.name = $stateParams.username;
    User.getUserByName({id: $stateParams.username},function(user){
      console.log("user data",user);
      $scope.favorites = user.favorites;
    });
  });
