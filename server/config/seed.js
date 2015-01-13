/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var async = require('async');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Order = require('../api/order/order.model')
var Product = require('../api/product/product.model')
var Promo = require('../api/promo/promo.model')
var Store = require('../api/store/store.model')
var Tag = require('../api/tag/tag.model')



async.waterfall([
    function(callback){
      User.find({}).remove(function() {
      User.create({
        provider: 'local',
        name: 'Lindsay',
        email: 'test@test.com',
        password: 'test',
        role: 'user',
        contact: {
          phone: 2011231234,
          address: '91 Wall Street'
        }
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Sam',
        email: 'admin@admin.com',
        password: 'admin',
        contact: {
          phone: 1938675309,
          address: '5 Hanover Square'
        }
      }, function(err,users) {
          callback();
        }
      );
    });
    },
    function(callback){
      User.find({},function(err,users){
        console.log('this is the second console log',users[0]._id.id);
        var idOne = users[0]._id;
        var idTwo = users[1]._id;
          Store.find({}).remove(function(){
            Store.create({
              name: "StoreOne",
              info: 'b',
              active: true,
              owner: idOne
            }, {
              name: "StoreTwo",
              info: 'a',
              active: true,
              owner: idTwo
            }, function(err,stores){
              console.error(err);
              console.log('this is the stores',stores);
              callback();
            }
          );
      });
    });
  },
  function(callback){
    User.find({},function(err,users){
      Store.find({},function(err,stores){
        Product.find({}).remove(function(){
          callback(null,users,stores);
        })
      })
    })
  },
  function(users,stores,callback){
    var lindsayStoreId = stores.filter(function(obj){
      if (obj.name==="StoreOne"){return obj._id;}
      })[0];
    var lindsayUserId = users.filter(function(obj){
      if (obj.name==="Lindsay"){return obj._id;}
      })[0];
    var samsUserId = users.filter(function(obj){
      if (obj.name==="Sam"){return obj._id;}
      })[0];
    var samsStoreId = stores.filter(function(obj){
      if (obj.name==="StoreTwo"){return obj._id;}
    })[0];
    var idObject = {
      'lindsayStoreId': lindsayStoreId,
      'samsStoreId': samsStoreId,
      'lindsayUserId': lindsayUserId,
      'samsUserId': samsUserId
    }
    Product.create({
      name: 'lindsay\'s Product',
      info: 'tp is life',
      active: true,
      upvotes: 1200,
      owner: lindsayStoreId,
      price: 19.99,
      description: 'tp is love',
      comments: [{
        review: true,
        body: 'this is the best item ever',
        user: lindsayUserId,
        stars: 5
      },
      {
        review: false,
        body: 'dis item is teh sux',
        user: samsUserId,
        stars: 1
      }],
      inventory: {
        available: 12,
        maximum: 42
      }
    },{
      name: 'sam\'s Product',
      info: 'wat is info',
      active: true,
      upvotes: 1010,
      owner: samsStoreId,
      price: 23.36,
      description: 'sams description',
      comments: [{
        review: true,
        body: 'mediocre item asdfasdfa asdfa ',
        user: lindsayUserId,
        stars: 3
      },{
        review: false,
        body: 'stop shitposting in my store',
        user: samsStoreId,
        stars: 5
      }],
      inventory: {
        available: 101,
        maximum: 20123
      }
    },function(){
      callback(null,idObject);
    })
  },
  function(idObject,callback){
    Product.find({},function(err,products){
      var lindsayProductId = products.filter(function(obj){
        if (obj.name==='lindsay\'s Product') {return obj._id;}
      })[0];
      var samProductId = products.filter(function(obj){
        if (obj.name==='sam\'s Product') {return obj._id;}
      })[0];
      idObject.lindsayProductId = lindsayProductId;
      idObject.samProductId = samProductId;
      Tag.find({}).remove(function(){
        callback(null,idObject);
      })
    })
  },
  function(idObject,callback){
    Tag.create({
      name: 'awesome',
      info: 'what is this field for',
      active: true,
      products: [idObject.samProductId]
    },{
      name: 'tpLove',
      info: 'tpLife',
      active: true,
      products: [idObject.lindsayProductId]
    },function(){
      callback(null,idObject)
    })
  },
  function(idObject,callback){
    Promo.find({}).remove(function(){
      Promo.create({
        name: 'lindsayPromo',
        info: 'because it\'s a good day',
        active: true,
        user: [idObject.lindsayUserId],
        product: [idObject.lindsayProductId],
        code: 'TPTPTP',
        role: 'wat is dis role?',
        store: idObject.lindsayStoreId
      },{
        name: 'samPromo',
        info: 'because reddit',
        active: true,
        user: [idObject.lindsayUserId,idObject.samsUserId],
        product: [idObject.samProductId],
        code: 'coffee',
        role: 'wat is dis seriously?',
        store: idObject.samsStoreId
      },function(){
        console.log(idObject, idObject);
        callback(null,idObject);
      })
    })
  },
  function(idObject,callback){
    Order.find({}).remove(function(){
      Order.create({
        name: 'is this a UUID?',
        info: 'needed field?',
        active: true,
        user: idObject.lindsayUserId,
        product: [idObject.samProductId],
        status: 'processing',
        owner: idObject.samsUserId
      },{
        name: 'necessary field?',
        info: 'maybe custom comment field for delivery instructions?',
        active: true,
        user: idObject.samsUserId,
        products: [idObject.lindsayProductId],
        status: 'shipped',
        owner: idObject.lindsayUserId
      },function(){
        console.log("success?");
        callback();
      })
    })
  },
  function(callback){
    User.find({},function(err,users){
      console.log('users',users);
      Store.find({},function(err,stores){
        console.log('stores',stores);
        Product.find({},function(err,products){
          console.log('products',products);
          Tag.find({},function(err,tags){
            console.log('tag',tags);
            Promo.find({},function(err,promos){
              console.log('promos',promos);
              Order.find({},function(err,orders){
                console.log('orders',orders);
                callback();
              })
            })
          })
        })
      })
    })
  }
]);
