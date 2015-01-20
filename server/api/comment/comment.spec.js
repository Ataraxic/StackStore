'use strict';

var should = require('should');
var app = require('../../app')
var Comment = require('./comment.model');
var request = require('supertest');

describe('GET /api/comments', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/comments')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});

describe('POST /api/comments', function() {
  it('should respond with 401 if req.canWrite = false', function(done){
    request(app)
    .post('/api/comments', {}, {
                  title: 'Title',
                  body: 'This is a review.',
                  owner: '54be6c99f16acdf44a40329c',
                  product: '54be6c99f16acdf44a4032a1',
                  upvotes: 0,
                  stars: 2
                })
    .expect(401, done)
  })

  // it('should respond with 200 if req.canWrite = true', function(done){

  // })
})
