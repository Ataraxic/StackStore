'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var statuses = 'Created Processing Cancelled Complete'.split(' ');

var OrderSchema = new Schema({
    name: {type: String},
    status: {type: String, enum: statuses},
    createdTime: { type: Date,default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stripeToken: String
});

module.exports = mongoose.model('Order', OrderSchema);
