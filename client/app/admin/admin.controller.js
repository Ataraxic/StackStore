'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();



    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.changePassword = function(user) {
      User.adminChangePassword({ id: user._id}, { newPassword: user.newPassword }, function(){});
      user.newPassword = '';
    }

    $scope.promoteToAdmin = function(user) {
      User.promote({ id: user._id }, {}, function(user){
        console.log('user', user)
      });
    }
  });
