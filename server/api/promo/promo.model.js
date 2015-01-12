'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromoSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Promo', PromoSchema);