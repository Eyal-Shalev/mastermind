(function (angular) {

  'use strict';

  angular.module('mastermind')

    .directive('mmResults', function () {
      // Runs during compile
      return {
         name: 'Results',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        //controller: function ($scope, $element, $attrs, $transclude) {
        //},
        require: '^ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '../templates/results.html',
        // replace: true,
        //transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function ($scope, $element, $attributes, ngModel) {
          ngModel.$render = function () {
            $scope.results = [];
            for (var i=0; i< ngModel.$viewValue.hits; i++) {
              $scope.results.push({
                type: 'hit'
              })
            }
            for (var i=0; i< ngModel.$viewValue.partials; i++) {
              $scope.results.push({
                type: 'partial'
              })
            }
          };

          $element.addClass('results');
        }
      };
    });
})(angular);
