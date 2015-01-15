'use strict';

angular.module('stackStoreApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          if (err.data!==null){
            err = err.data;
            $scope.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              console.log(field);
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          } else {
            form.name.$setValidity('taken',false);
            $scope.errors['taken'] = 'Username is already taken.';
          }

        });
      }
    };

  });
