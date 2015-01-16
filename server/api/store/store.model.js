'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Product = require('../product/product.model');

var StoreSchema = new Schema({
    name: {type: String, required: true, lowercase: true, unique: true},
    info: String,
    active: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

StoreSchema.statics.getProducts = function(name, cb) {
   this.findOne({
        name: name
    }, function(err, store) {
        console.log('STORE OWNER IS ISSIS',store.owner);
        Product.find({}, cb);
    });

}

module.exports = mongoose.model('Store', StoreSchema);
