'use strict';

var express = require('express');
var controller = require('./product.controller');
var s3_upload = require('./s3_upload');

var router = express.Router();

router.get('/sign_s3',s3_upload);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/reviews', controller.getReviews);
router.post('/cache', controller.populateFromCache);


module.exports = router;
