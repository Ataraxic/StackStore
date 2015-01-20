'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var User = require('../user/user.model');
var Product = require('../product/product.model');

// Get list of comments
exports.index = function(req, res) {
  Comment.find(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Get a single comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  console.log("creating",req.canWrite);
  if (req.canWrite===true){
    Comment.create(req.body, function(err, comment) {
      console.log(err)
      console.log('comment',comment);
      if(err) { return handleError(res, err); }
        User.findOne({_id:req.body.owner},function(err,user){
          if (err) { return handleError(res,err);}
            user.comments.push(comment._id);
            user.save();
            Product.findOne({_id:req.body.product},function(err,product){
              product.comments.push(comment._id);
              product.save();
              comment.populate('owner','-salt -hashedPassword',function(err,result){
                if (err) { return handleError(res,err);}
                  return res.json(201, comment);
              })
            })
          })
        });
  } else {
    return handleError(res,"unauthorized");
  }
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
