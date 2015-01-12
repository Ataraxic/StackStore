'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromoSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    user: [{
        type: Schema.Types.ObjectId,
        ref: ‘User’
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: ‘Products’
    }],
    code: String,
    role: String,
    store: {
        type: Schema.Types.ObjectId,
        ref: ‘Store’
    }
});

module.exports = mongoose.model('Promo', PromoSchema);
