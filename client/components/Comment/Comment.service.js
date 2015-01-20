'use strict';

angular.module('stackStoreApp')
  .factory('Comment', function ($resource) {
    return $resource('/api/comments/:id/:option', {
      id: '@_id' //This ID is the comment ID to get, or when POSTing contains the userID
    },
    {
      create: {
        method: 'POST'
      },
      reviewAuth: {
        method: 'POST',
        params: {
          option: 'reviewAuth'
        }
      }
    });
  });
