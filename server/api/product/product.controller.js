'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var Store = require('../store/store.model');
var Order = require('../order/order.model');
var async = require('async');
var User = require('../user/user.model');

// Get list of products
exports.index = function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, products);
    });
};

// Get a single product
exports.show = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        return res.json(product);
    });
};

// Creates a new product in the DB.
exports.create = function(req, res) {

    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        storeId: req.body.storeId,
        price: req.body.price,
        media: req.body.media,
        tags: req.body.tags
    });


    product.save(
        function(err, product) {
            if (err) {
                return handleError(res, err);
            }
res.json(product);
});

};

// Updates an existing product in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        var updated = _.merge(product, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, product);
        });
    });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        product.remove(function(err, product) {
            if (err) {
                return handleError(res, err);
            }

            Store.findOne({
                name: req.query.storeName
            }, function(err, store) {
                if (err) {
                    return handleError(res, err);
                }
                if (!store) {
                    return res.send(404);
                };
            });

        });
    });
};

//Get Product and populated reviews
exports.getReviews = function(req,res){
  Product.findById(req.params.id)
         .populate('comments')
         .exec(function(err,results){
           if (err) console.log(err);
           res.json(200,results);
         })
}

//Save reviews and authenticate
exports.addReview = function(req,res){
  res.json(200);
}

//Check if able to add reviews
exports.reviewAuth = function(req,res){
  var productId = req.params.id;
  console.log('hitting This!!',req.body);
  var userId = req.body.userId;
  console.log('userId',userId);
  User.findById(userId)
      .populate('comments')
      .exec(function(err,user){
        // var userComments = user[0].comments;
        console.log(user);
      })

}

//Populate products in user cart
exports.populateFromCache = function(req, res) {

    Product.find({
        '_id': {
            $in: req.body.products
        }
    }, function(err, products) {

        if (err) {
            return res.json(404)
        }
        return res.json(products);
    })
}

function handleError(res, err) {
    return res.send(500, err);
}
