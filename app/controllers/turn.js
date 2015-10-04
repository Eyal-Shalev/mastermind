(function (angular) {

  'use strict';

  angular.module('mastermind')

    .directive('mmTurn', function () {
      // Runs during compile
      return {
         name: 'Turn',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        //controller: function ($scope, $element, $attrs, $transclude) {
        //},
        require: '^ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/templates/turn.html',
        // replace: true,
        //transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function ($scope, $element, $attributes, ngModel) {
          ngModel.$render = function () {
            $scope.turn = ngModel.$viewValue;
          };

          $element.addClass('turn');

          $scope.disabled = $attributes.disabled !== undefined ? true : false;
        }
      };
    });
})(angular);
