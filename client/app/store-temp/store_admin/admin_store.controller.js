'use strict';

angular.module('stackStoreApp')

.controller('StoreAdminCtrl', function($scope, $http, $location, Auth, $stateParams, User, Product, socket, Store, Tags) {

    $scope.owner = false;
    $scope.storeName = $stateParams.name;
    $scope.store = {};
    $scope.storeId = '';

    $scope.name = null;
    $scope.description = null;
    $scope.price = null;
    $scope.tag = '';
    $scope.tags = [];
    $scope.product_images = [];
    $scope.currentPromos = [];



    //Get Owner ID and storeId of current store
    User.get().$promise
        .then(function(user) {
            var store = Store.get({
                name: $stateParams.name
            }, function(store) {
                if (user._id === store.owner) {
                    $scope.owner = true;
                    $scope.store = store;
                    $scope.storeId = store._id;
                    $scope.ownerId = store.owner;
                    $http.get('/api/promos/' + $scope.store._id)
                    .then(function(response){
                      $scope.currentPromos = response.data;
                      $scope.currentPromos.forEach(function(promo){
                        promo.expiry = new Date(promo.expiry);
                      })
                    })
                    .catch(function(err){
                     console.log('err in promos get', err);
                    })
                } else {
                    $location.path('/store/' + $stateParams.name);
                }
            })
        })
        .then(null, function(err) {
            $location.path('/store/' + $stateParams.name);
        })

    //Get all products in store
    Store.getProducts({
            name: $scope.storeName
        }).$promise
        .then(function(products) {
            $scope.products = products;
        })

    $scope.addTag = function(tag) {
        $scope.tags.push(tag);

    }

    //Add a new product
    $scope.addProduct = function() {

        $scope.products = [];
        
        if ($scope.name === '') {
            return;
        }
        if ($scope.price === '') {
            return;
        }
        if ($scope.description === '') {
            return;
        }

        console.log('Adding product.. params are: ', $scope.name, $scope.description, $scope.price,  $scope.storeId);
        //CREATING NEW TAG OBJECTS

        // for (var k = 0; k<$scope.tags.length; k++)
        // {
        //     console.log('$scope.tag is...', $scope.tags[k]);
        //   Tags.save({name: $scope.tags[k]}, function(tag) {
        //     console.log('pushing into tagscollection')
        //     $scope.tags.push(tag)
        // })
        // }

        Product.save({
            name: $scope.name, 
            description: $scope.description,
            price: $scope.price,
            // tags: $scope.tags,
            storeId: $scope.storeId,
            media: $scope.product_images
        }, function() {
            // if (err) {console.log(err)};
            console.log('Hitting Product.save callback..');
            // $scope.products.push(product);
            //  socket.syncUpdates('Product', $scope.products);
            // Get all products in store
            Store.getProducts({
                    name: $scope.storeName
                }).$promise
                .then(function(products) {
                    $scope.products = products;
                    console.log('PRODUCTS HSOULD BE LOADING', $scope.products)
                })
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

    $scope.createPromo = function() {
      if(!$scope.promoCode || !$scope.promoExpiry || !$scope.promoDiscount || !$scope.promoDescription) {
        window.alert('Fill out all categories!');
      } else {
        $http.post('/api/promos', { description: $scope.promoDescription, code: $scope.promoCode, expiry: $scope.promoExpiry, discount: $scope.promoDiscount, store: $scope.store._id })
        .then(function(response){
          $scope.promoCode = $scope.prompExpiry = $scope.promoDiscount = $scope.promoDescription = '';
          var promo = response.data;
          promo.expiry = new Date(promo.expiry);
          $scope.currentPromos.push(promo);
        })
        .catch(function(err){
          console.log('oh snap:', err);
        })
      }
    }
});
