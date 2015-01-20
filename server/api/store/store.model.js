'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Product = require('../product/product.model');

var StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
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
            console.log('its finding the store--> ', store);
        if (err) console.log('Error is', err);
        if(!store) { console.log('Store is null') }

        Product.find({storeId: store._id},function(err, products){
            //MONGOOSE POPULATE SYNTAX FOR POPULATING ARRAY
            Product.populate(products, {path: 'tags', model:'Tag'}, cb)
        });
 
    })

}

module.exports = mongoose.model('Store', StoreSchema);
