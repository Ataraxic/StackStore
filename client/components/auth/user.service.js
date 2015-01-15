'use strict';

angular.module('stackStoreApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeEmail: {
        method: 'PUT',
        params: {
          controller: 'email'
        }
      },
      adminChangePassword: {
        method: 'PUT'
      },
      promote: {
        method: 'PUT',
        params: {
          controller:'promote'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getUserByName: {
        method: 'GET',
        params: {
          controller: 'profile'
        }
      }
	  });
  });
