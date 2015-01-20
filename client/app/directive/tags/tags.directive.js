'use strict';

angular.module('stackStoreApp')
  .directive('tags', function (Tags) {
    return {
      templateUrl: 'app/directive/tags/tags.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        // this is wrong.
        scope:true;
        // this should be in the controller?
        //also you can just say

        /*
          scope.tagobjects = Tags.query()
        */

        Tags.query().$promise
        .then(function(tags) {
            scope.tagobjects = tags;
            });
      
       
      }
    };
  });
