'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/products', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/products', function() {

  it('should respond with 500 validation error when not logged in', function(done) {
    request(app)
      .post('/api/products', { name: 'Name', description: 'Description', storeId: '54be77179ff3a5834bc0c124',
                                price: 20, media: [], tags: []})
      .expect(500, done)
  });
});
