'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    status: String,
    total: Number,
    storeOwner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    stripeToken: String
});

module.exports = mongoose.model('Order', OrderSchema);
