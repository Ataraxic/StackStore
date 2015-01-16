'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/stackstore-dev'
  },

  seedDB: true,

  aws: {
  	access: 'AKIAJHTVFP5SB6JCJ5NA',
  	secret: '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'
  }
};
