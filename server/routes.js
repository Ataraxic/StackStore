/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  // app.use('/charge', function(req, res) {
  //   console.log("inside of charge", req.body);

  // });
  app.use('/api/stripes', require('./api/stripe'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/promos', require('./api/promo'));
  app.use('/api/stores', require('./api/store'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/tags', require('./api/tag'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));


  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
