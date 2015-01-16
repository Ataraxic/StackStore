'use strict';

angular.module('stackStoreApp')

.controller('StoreAdminCtrl', function($scope, $http, $location, Auth, $stateParams, User, Product, socket, Store) {

    $scope.owner = false;
    $scope.storeName = $stateParams.name;
    $scope.store = {};

    $scope.name = '';
    $scope.info = '';
    $scope.price = '';
    $scope.tag = '';
    $scope.tags = [];
    $scope.product_images = [];

    //Get Owner ID of current store
    User.get().$promise
        .then(function(user) {
            var store = Store.get({
                name: $stateParams.name
            }, function(store) {
                if (user._id === store.owner) {
                    $scope.owner = true;
                    $scope.store = store;
                } else {
                    $location.path('/store/' + $stateParams.name);
                }
            })
        })
        .then(null, function(err) {
            $location.path('/store/' + $stateParams.name);
        })


    $scope.addTag = function(tag) {
      $scope.tags.push(tag);
      console.log($scope.tags);
    }

    //Add a new product
    $scope.addProduct = function() {
    		console.log('adding')
        if ($scope.name === '') {
            return;
        }
        if ($scope.info === '') {
            return;
        }
        if ($scope.price === '') {
            return;
        }

        Product.save({
            name: $scope.name,
            info: $scope.info,
            price: $scope.price,
            owner: $scope.ownerId,
            // $push: {"tags": {: title, msg: msg}},
            storeName: $scope.storeName,
            media:$scope.product_images
        }, function(product) {
            console.log(product);
            Store.get({
                name: $stateParams.name
            }, function(store) {
                console.log(store);
                $scope.store = store;
            });
        })

    }

    $scope.deleteProduct = function(id) {
        Product.remove({
            id: id,
            storeName: $scope.storeName
        }, function(product) {
            console.log(product);
            Store.get({
                name: $stateParams.name
            }, function(store) {
                console.log(store);
                $scope.store = store;

            });
        })

    }

    $scope.upload = function(thing){
    	console.log('thing');
    	var file_name = angular.element('#file-upload').val().split('\\');
    file_name = file_name[file_name.length-1];

    console.log(file_name);

    //S3 Upload is a separate client side library I'll attach
    var s3upload = new S3Upload({
    		//The file input
        file_dom_selector: 'file-upload',
        //The name from above
        s3_object_name : file_name,
        //The route that will receive the upload and send to S3
        //See below
        s3_sign_put_url: 'api/products/sign_s3',
        //Use this hook for a nice progress bar!
        onProgress: function(percent, message) {
           console.log('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            console.log('Upload completed. Uploaded to: '+ public_url)
            console.log(public_url)
            $scope.$apply(function () {
		            $scope.product_images.push(public_url);
		        });

            //Include the public url in the body of the form to be submitted.

            //Something like this would work inside the form:
            //HTML
            //<input type="hidden" name="public_url" id="public_url">

            //Client side js
            //document.getElementById('public_url').value = public_url

            //That way you'll have a public_url in the req.body
        },
        onError: function(status) {
            console.log('Upload error: ' + status);
        }
    });
    }
});