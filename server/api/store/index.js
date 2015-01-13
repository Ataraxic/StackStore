'use strict';

var express = require('express');
var controller = require('./store.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', controller.create);
router.put('/:name', controller.update);
router.patch('/:name', controller.update);
router.delete('/:name', controller.destroy);

module.exports = router;