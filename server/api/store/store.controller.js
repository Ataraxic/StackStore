'use strict';

var _ = require('lodash');
var async = require('async');
var Store = require('./store.model');
var User = require('../user/user.model');


//Find all products in store
// exports.findproducts = function(req, res) {
//   Store.findOne( {name: req.params.name}, function (err, store) {
//     if(err) { return handleError(res, err); }
//     if(!store) { return res.send(404); }
//     }).success(function () {
//       Product.find({name: req.params.name}, function (err, products) {
//       if(err) { return handleError(res, err); }
//       return res.json(200, products);
//     });
//   });
// };



// Get list of stores
exports.index = function(req, res) {
    Store.find(function(err, stores) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, stores);
    });
};

// Get a single store
exports.show = function(req, res) {
    Store.findOne({
        name: req.params.name
    }, function(err, store) {
        if (err) {
        		console.log('error')
            return handleError(res, err);
        }
        if (!store) {
        		console.log('no store')
            return res.send(404);
        }
        if (req.user) {
        		console.log('user');
            if (req.owner) {
            		console.log('owner');
                var adminObj = {
                    ownerPresent: true,
                    store: store
                }
                return res.json(adminObj);
            }
            else{
            	return res.json(store);
            }
        }
    });
};

// Creates a new store in the DB.
exports.create = function(req, res) {
<<<<<<< HEAD
	console.log(req.user);
  var store = new Store({ owner: req.user._id, name: req.body.name, products: []});
  store.save(function (err, store) {
    if (err) { return handleError(res, err); }
    else return res.json(store);
  });
=======
    console.log(req.user);
    var store = new Store({
        owner: req.user._id,
        name: req.body.name,
        products: []
    });

    store.save(function(err, store) {
        if (err) {
            return handleError(res, err);
        }
        User.findById(req.user._id, function(err, user) {
            if (err) {
                return handleError(res, err);
            }

            console.log(store._id);
            user.stores.push(store._id)
            user.save(function(err, user) {
                return res.json(store);
            })
        });
    });
>>>>>>> master

};

// Updates an existing store in the DB.
exports.update = function(req, res) {
<<<<<<< HEAD
  if(req.body._id) { delete req.body._id; }
  Store.find({name: req.params.name}, function (err, store) {
    if (err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    var updated = _.merge(store, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, store);
=======
    if (!req.owner) return res.send(404);
    if (req.body._id) {
        delete req.body._id;
    }
    Store.findById(req.params.id, function(err, store) {
        if (err) {
            return handleError(res, err);
        }
        if (!store) {
            return res.send(404);
        }
        var updated = _.merge(store, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, store);
        });
>>>>>>> master
    });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
    if (!req.owner) return res.send(404);
    Store.findById(req.params.id, function(err, store) {
        if (err) {
            return handleError(res, err);
        }
        if (!store) {
            return res.send(404);
        }
        store.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

exports.checkOwner = function (req,res){
	if(req.owner) return res.send(200);
	else {
		return res.send(404);
	}
}

function handleError(res, err) {
    return res.send(500, err);
}
