'use strict';

angular.module('stackStoreApp')
  .directive('tags', function (Tags) {
    return {
      templateUrl: 'app/directive/tags/tags.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope:true;

        // Tags.query().$promise
        // .then(function(tags) {
        //     scope.tagobjects = tags;
        //     });
      
       
      }
    };
  });