'use strict';

angular.module('stackStoreApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.user = Auth.getCurrentUser();

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
                    $scope.user.profilePic = public_url;
                });
                Auth.changeProfilePic(public_url,function(){
                	console.log(200)
                })

            },
            onError: function(status) {
                console.log('Upload error: ' + status);
            }
        });
    }

  });
