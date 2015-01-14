'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  info: String,
  active: Boolean,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Cart', CartSchema);
