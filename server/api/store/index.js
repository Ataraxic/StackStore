'use strict';

var express = require('express');
var controller = require('./store.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//Find all products of specific store
// router.get('/:name/products', controller.findproducts);

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:name', controller.update);
router.patch('/:name', controller.update);
router.delete('/:name', controller.destroy);

module.exports = router;