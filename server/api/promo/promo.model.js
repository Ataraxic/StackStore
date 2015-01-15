'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromoSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,

    //i think the point of promo codes is that htey could be for any user
    //are these the users that have redeemed them?
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    //whitelist of allowed products? products purchased with code?
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    code: String,
    role: String,
    // no sitewide promos?
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }
});

module.exports = mongoose.model('Promo', PromoSchema);
