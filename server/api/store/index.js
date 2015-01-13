'use strict';

var express = require('express');
var controller = require('./store.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', auth.isStoreOwner(),controller.show);
router.post('/',auth.isAuthenticated(),controller.create);
router.put('/:name', auth.isStoreOwner(),controller.update);
router.patch('/:name', controller.update);
router.delete('/:name', auth.isStoreOwner(),controller.destroy);

router.get('/:name/admin',auth.isStoreOwner(),controller.checkOwner);

module.exports = router;