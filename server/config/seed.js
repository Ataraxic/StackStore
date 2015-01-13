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
        name: 'Test User',
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
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        contact: {
          phone: 1938675309,
          address: '5 Hanover Square'
        }
      }, function(err,users) {
          console.log('this is the firnst console log',users);
          callback();
        }
      );
    });
    },
    function(callback){
      User.find({},function(err,users){
        console.log('this is the second console log',users[0]._id.id);
        var idOne = users[0]._id.toString();
        var idTwo = users[1]._id.toString();
        for (var keys in users[0]._id){
          console.log("this is key",keys);
        }
          Store.find({}).remove(function(){
            Store.create({
              name: "lindsay\'s Store",
              info: 'b',
              active: true,
              owner: idOne
            }, {
              name: "Sam\'s Store'",
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
  }
]);
