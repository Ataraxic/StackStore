'use strict';

angular.module('stackStoreApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeEmail = function(emailForm){
      $scope.emailSubmitted = true;
      if (emailForm.$valid){
        Auth.changeEmail($scope.user.password, $scope.user.newEmail)
        .then(function(){
          $scope.emailMessage = 'Email successfully changed.';
        })
        .catch (function(){
          emailForm.pasword.$setValidity('mongoose',false);
          $scope.errors.password = 'Incorrect password';
          $scope.emailMessage = '';
        });
      }
      $scope.user.password = '';
      $scope.user.newEmail = '';
    };

  });
