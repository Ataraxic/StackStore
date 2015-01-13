'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var Store = require('../store/store.model');

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
        info: req.body.info,
        price: req.body.price,
        owner: req.body.owner
    });

    product.save(
        function(err, product) {
            if (err) {
                return handleError(res, err);
            }
            console.log(req.body.storeName);

            Store.findOne({
                name: req.body.storeName
            }, function(err, store) {
                if (err) {
                    return handleError(res, err);
                }
                if (!store) {
                    return res.send(404);
                };

                store.products.push(product._id);

                console.log(store.products);

                store.save(function(err, store) {
                    res.json(product);
                });
            });
        }

    );

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
        product.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
