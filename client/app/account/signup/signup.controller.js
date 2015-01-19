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
          password: $scope.user.password,
          profilePic : $scope.user.profilePic
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

        $scope.upload = function(thing) {
        console.log('thing');
        var file_name = angular.element('#file-upload').val().split('\\');
        file_name = file_name[file_name.length - 1];

        console.log(file_name);

        //S3 Upload is a separate client side library I'll attach
        var s3upload = new S3Upload({
            //The file input
            file_dom_selector: 'file-upload',
            //The name from above
            s3_object_name: file_name,
            //The route that will receive the upload and send to S3
            //See below
            s3_sign_put_url: 'api/products/sign_s3',
            //Use this hook for a nice progress bar!
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinishS3Put: function(public_url) {
                console.log('Upload completed. Uploaded to: ' + public_url)
                console.log(public_url)
                $scope.$apply(function() {
                    $scope.user.profilePic;
                });

            },
            onError: function(status) {
                console.log('Upload error: ' + status);
            }
        });
    }

  });
