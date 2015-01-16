'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    active: Boolean,
    upvotes: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{type: Number, required: true} ,
    description:{type: String,required: true},
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
