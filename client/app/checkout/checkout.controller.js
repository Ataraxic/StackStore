'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Cart, User, Auth, $http, $location) {

    if(Auth.isLoggedIn()) {
      console.log('current user: ', Auth.getCurrentUser())
    } else {
      console.log('uh not logged in')
      $location.path('/');
    }
    $scope.onCheckout = function () {
      console.log("working?");
      // $http.post("/api/stripes", { email: 'email@email.com' })
    }
    $scope.stripeCallback = function (code, result) {
      if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
      } else {
        $http.post("/api/stripes", {
          token: result.id,
          email: 'lindslev.ll@gmail.com',
          amount: 10
        });
        //will need to post to users as well and make the order

        window.alert('success! token: ' + result.id);
      }
    };

  });
