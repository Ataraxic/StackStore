'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Cart, User, Auth, $http, $location) {

    if(Auth.isLoggedIn()) {
      Cart.get(function(err, data){
        $scope.cart = data.cart;
        $scope.total = 0;
        $scope.cart.forEach(function(item){
          $scope.total += item.price;
        })
        console.log('Logged in! Cart: ', $scope.cart, $scope.total)
      });
    } else {
      console.log('Not logged in.')
      $location.path('/');
    }
    $scope.onCheckout = function () {
      //this function will also run when pay btn is click, use it if needed
    }
    $scope.stripeCallback = function (code, result) {
      if (result.error) {
        window.alert("Error: please enter valid credit card info!")
        // window.alert('it failed! error: ' + result.error.message);
      } else {
        // $http.post("/api/stripes", {
        //   token: result.id,
        //   email: 'lindslev.ll@gmail.com',
        //   amount: 10
        // });
        //post to server-side order controller and make the order for the buyer and all the store owners
        // window.alert('success! token: ' + result.id);
        $http.post("/api/orders", { stripeToken: result.id })
          .success(function(order){

          })
          .error(function(err){
            console.log('err');
            window.alert("Cart is empty");
          });
      }
    };

  });
