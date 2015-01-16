'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var statuses = 'Created Processing Cancelled Complete'.split(' ');

var OrderSchema = new Schema({
<<<<<<< HEAD
    name: {type: String },
    buyer: {
=======
    name: {type: String},
    status: {type: String, enum: statuses},
    createdTime: { type: Date,default: Date.now },
    user: {
>>>>>>> master
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
<<<<<<< HEAD
    buyerOrder : {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: null
    },
    products: [],
    status: { type: String },
    createdTime: { type: Date, default: Date.now },
    storeOwner: [{
=======
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    owner: {
>>>>>>> master
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    stripeToken: String
});

module.exports = mongoose.model('Order', OrderSchema);
