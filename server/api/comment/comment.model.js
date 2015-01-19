'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title:{type: String, required: true},
  body: {type: String, required: true},
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  upvotes:{type: Number, default: 1},
  stars: {type:Number, min: 0, max: 5, required: true}
  });

module.exports = mongoose.model('Comment', CommentSchema);
