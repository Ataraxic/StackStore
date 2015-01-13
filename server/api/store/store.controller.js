'use strict';

var _ = require('lodash');
var async = require('async');
var Store = require('./store.model');
var User = require('../user/user.model');

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
            return handleError(res, err);
        }
        if (!store) {
            return res.send(404);
        }
        if(req.user){
        	console.log(req.user._id);
        	console.log(store.owner);
        	console.log(store.owner.equals(req.user._id));
        	if(store.owner.equals(req.user._id)){
        		var adminObj = {
        			ownerPresent: true,
        			store: store
        		}
        		return res.json(adminObj);
        	}
        }
        return res.json(store);
    });
};

// Creates a new store in the DB.
exports.create = function(req, res) {
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

};

// Updates an existing store in the DB.
exports.update = function(req, res) {
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
    });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
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

function handleError(res, err) {
    return res.send(500, err);
}
