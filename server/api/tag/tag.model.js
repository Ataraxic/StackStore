'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  products: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports = mongoose.model('Tag', TagSchema);