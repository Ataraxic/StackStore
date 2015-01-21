'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');
var Product = require('../product/product.model');

// Get list of tags
exports.index = function(req, res) {
    Tag.find(function(err, tags) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, tags);
    });
};

exports.byname = function(req,res) {

    Tag.findOne({'name': req.params.name}, function(err, tag) {
        if (err) {
            return handleError(res, err);
        }
        if (!tag) {
            return res.send(404);
        }
        console.log('XXX', tag)
        Product.find({tags: tag._id})
        .exec(function(err, products){
              if (err) {
            console.log(err);
        }
        if (!products) {
            return res.send(404);
        }
        console.log('PRODUCSTS IS  ', products)
        return res.json(products);
        })

    })
}


// Get a single tag
exports.show = function(req, res) {
    Tag.findById(req.params.id, function(err, tag) {
        if (err) {
            return handleError(res, err);
        }
        if (!tag) {
            return res.send(404);
        }
        console.log('TAG IS ', tag)
        return res.json(tag);
    });
};

// Creates a new tag in the DB.
exports.create = function(req, res) {

    Tag.findOne({
        'name': req.body.name
    }, function(err, tag) {
        if (err) {
               console.log(err.name);
               return;
        }
        if (!tag) {
          console.log('Tag doesnt exist yet, saving in db')
           var atag = new Tag({
                name: req.body.name,
            });
            atag.save(
                function(err, tag) {
                  if (err) {return handleError(res, err);}
                    console.log('hitting tags controller, tag.save-->', tag )
                    res.json(tag);
                });
            return;
        }
        else {
        console.log('Tag already exists', tag.name)
        res.json(tag);
      }
    })



    // var tag = new Tag({
    //     name: req.body.name,
    // });

    // tag.save(
    //     function(err, tag) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         res.json(tag);
    //     });
}

// Updates an existing tag in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Tag.findById(req.params.id, function(err, tag) {
        if (err) {
            return handleError(res, err);
        }
        if (!tag) {
            return res.send(404);
        }
        var updated = _.merge(tag, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, tag);
        });
    });
};

// Deletes a tag from the DB.
exports.destroy = function(req, res) {
    Tag.findById(req.params.id, function(err, tag) {
        if (err) {
            return handleError(res, err);
        }
        if (!tag) {
            return res.send(404);
        }
        tag.remove(function(err) {
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