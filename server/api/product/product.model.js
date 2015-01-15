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
      type: Schema.Types.ObjectId,
      ref: 'Comment'
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

ProductSchema.index({name: 'text',info: 'text',description: 'text'});

module.exports = mongoose.model('Product', ProductSchema);
