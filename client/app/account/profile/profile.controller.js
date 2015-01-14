'use strict';

angular.module('stackStoreApp')
  .controller('ProfileCtrl', function ($scope,User,Auth,$stateParams) {
    $scope.name = $stateParams.username;
    $scope.favorites = User.getUser({id: $stateParams.username},function(user){
      console.log(user);      
    });
  });
