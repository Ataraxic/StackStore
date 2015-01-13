'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    upvotes: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    description: String,
    comments: [{
        review: Boolean,
        body: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        stars: Number
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tags'
    }],
    inventory: {
        available: Number,
        maximum: Number
    },
    media: [String]
});

module.exports = mongoose.model('Product', ProductSchema);
