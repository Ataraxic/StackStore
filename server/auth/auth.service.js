'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var Store = require('../api/store/store.model');
var Order = require('../api/order/order.model');
var Product = require('../api/product/product.model');
var async = require('async');
var validateJwt = expressJwt({
    secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.findById(req.user._id, function(err, user) {
                if (err) return next(err);
                if (!user) return res.send(401);

                req.user = user;
                next();
            });
        });
}

function isStoreOwner() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            if (req.user) {
                User.findById(req.user._id, function(err, user) {
                    if (err) return next(err);
                    if (!user) return next();

                    Store.findOne({
                        name: req.params.name
                    }, function(err, store) {
                        if (err) return next(err);
                        if (!store) return next();
                        console.log('isStoreOwner:')
                        console.log(store.owner.equals(req.user._id));
                        if (store.owner.equals(req.user._id)) {
                            req.user = user;
                            req.owner = true;
                            next();
                        } else {
                            req.user = user;
                            next();
                        }
                    });
                });
            }
            else{
            	next();
            }
        });
}
//Utility Function for reviewAuth
function hasProp(comments,productId){
  for (var i=0;i<comments.length;i++){
    // console.log("comments vs productId",comments[i].product.toString(),productId);
    if (comments[i].product.toString()===productId){ //User has made a comment on this product already
      return true;
    }
  }
  return false; //user has not made a comment on this product already
}

function ownsProduct(orders,productId){
  for (var i=0;orders.length;i++){ //Loop through orders
    console.log("the order ",orders);
    for (var n=0;orders[i].products.length;n++){ //Loop through products in each order
      // console.log("orders",orders[i]);
      // console.log(orders[i].products[n])
      if (orders[i].products[n]._id.toString()===productId){
        return true; //User has ordered this product
      }
    }
  }
  return false; //User has not ordered this product
}
//Checks if the user has bought the product
function canAddReview(){
  // console.log("inside CanAddReview");
  return compose()
    //validate jwt
    .use(function(req,res,next){
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    //
    .use(function(req,res,next){
      async.waterfall([function(callback){
        User.findById(req.body.owner)
            .populate('comments')
            .exec(function(err,results){
              console.log("results",results);
              if (err) console.log('err',err);
              if (hasProp(results.comments,req.body.product)){
                console.log("user has already written a review");
                callback(null,true); //Has the user already written a review on this product;
              } else {
                console.log("user has not written a review");
                callback(null,false); //User has not already written a review;
              }
        });
      },
      function(already,callback){
        if (already){
          callback(null,true,null);
        } else {
          Order.find({buyer: req.body.owner})
               .populate('products')
               .exec(function(err,orders){
                 if (err) console.log('err',err)
                 callback(null,false,orders);
               })
        }
      },
      function(already,orders,callback){
        if (already){
          callback(null,true);
        } else {
          if (ownsProduct(orders,req.body.product)){
            console.log("user has ordered this product");
            callback(null,false);
          } else {
            console.log("user has not ordered this product");
            callback(null,true);
          }
        }
      },
      function(finalRes,callback){
          if (finalRes){
            req.canWrite=false;
            next();
          } else {
            req.canWrite = true;
            next();
          }
      }])
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.send(403);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
    return jwt.sign({
        _id: id
    }, config.secrets.session, {
        expiresInMinutes: 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
    if (!req.user) return res.json(404, {
        message: 'Something went wrong, please try again.'
    });
    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

exports.isStoreOwner = isStoreOwner;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.canAddReview = canAddReview
