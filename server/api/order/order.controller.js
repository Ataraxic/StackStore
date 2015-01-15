'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var User = require('../user/user.model');

// Get list of orders
exports.index = function(req, res) {
  Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
  var userId = req.user._id;
  var cart, user;
  User.findById(userId, function(err, user){
    cart = user.cart, user = user;
    if(!cart) res.send(404, "No cart...");
    if(cart.length == 0) res.send(404, "Cart is empty!");
    var newOrder = new Order();
    newOrder.buyer = req.user._id;
    newOrder.products = cart;
    newOrder.status = "Pending";
    newOrder.stripeToken = req.body.stripeToken;

    //build hash of storeowners key: storeOwnerId, obj { products: [] }
    var storeHash = {};
    cart.forEach(function(item){
      console.log('item in cart', item)
      // if(storeHash.hasOwnProperty(item.owner)) {
      //   if(storeHash[item.owner].products) {
      //     storeHash[item.owner].products.push(item);
      //   } else {
      //     storeHash[item.owner].products = [];
      //     storeHash[item.owner].products.push(item);
      //   }
      // } else {
      //   storeHash[item.owner] = { products: [] };
      //   storeHash[item.owner].products.push(item);
      // }
      // if(!storeHash[item].products) storeHash[item].products = [];
      // storeHash[item].products.push(item);
    })

    for(var owner in storeHash) {
      newOrder.storeOwner.push(owner);
    }

    newOrder.save(function(err, order){
      user.orders.push(order);
      user.cart = []; //empty cart after order is fulfilled
      user.save(function(err, user) {
        console.log('user after fulfilled', user);
        console.log('order after fulfilled', order);
        return res.json(order);
      })
    })
  });

};

// Updates an existing order in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    var updated = _.merge(order, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
