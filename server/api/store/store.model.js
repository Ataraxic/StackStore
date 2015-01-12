'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    name: String
});

module.exports = mongoose.model('Store', StoreSchema);
