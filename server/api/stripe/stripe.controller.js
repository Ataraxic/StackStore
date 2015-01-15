'use strict';

var _ = require('lodash');
var stripe = require('stripe')('sk_test_AywCYPXSsCA4HtunikxZRYA6');

// Get list of stripes
exports.index = function(req, res) {
  // Stripe.find(function (err, stripes) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, stripes);
  // });
};

// Get a single stripe
exports.show = function(req, res) {
  Stripe.findById(req.params.id, function (err, stripe) {
    if(err) { return handleError(res, err); }
    if(!stripe) { return res.send(404); }
    return res.json(stripe);
  });
};

// Creates a new stripe in the DB.
exports.create = function(req, res) {
  console.log('testing the stripe call', req.body)
  stripe.customers.create({
    email: req.body.email,
    card: req.body.token
    })
  .then(function(customer) {
    return stripe.charges.create({
      amount: req.body.amount + "00",
      currency: 'usd',
      customer: customer.id
    });
  })
  .then(function(charge) {
    console.log('Charged successfully!', charge);
  }, function(err) {
    console.log('Not charged, error: ', err);
  });
};

// Updates an existing stripe in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stripe.findById(req.params.id, function (err, stripe) {
    if (err) { return handleError(res, err); }
    if(!stripe) { return res.send(404); }
    var updated = _.merge(stripe, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stripe);
    });
  });
};

// Deletes a stripe from the DB.
exports.destroy = function(req, res) {
  Stripe.findById(req.params.id, function (err, stripe) {
    if(err) { return handleError(res, err); }
    if(!stripe) { return res.send(404); }
    stripe.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
