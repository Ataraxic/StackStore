'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/orders', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/orders')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/orders', function() {

  it('should respond with 401 when not logged in', function(done) {
    request(app)
      .post('/api/orders',  { stripeToken: 'testToken', chargeId: 'testId', promo: null })
      .expect(401, done)
  });
});
