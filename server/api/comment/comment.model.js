'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  upvotes: Number,
  stars: Number,
  active: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);
