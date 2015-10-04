(function (angular) {

  'use strict';

  angular.module('mastermind')

    .directive('mmPallet', function () {
      var selectedCell = null;
      // Runs during compile
      return {
         name: 'Pallet',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude) {
          $scope.openPallet = function(cell) {
            selectedCell = cell;
            cell.value.selected = false;
            $element.addClass('pallet-is-visible');

          };
          $scope.closePallet = function(option) {
            selectedCell.value = option;
            option.selected = true;
            selectedCell = null;
            $element.removeClass('pallet-is-visible');
          }
        },
        require: '^ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '../templates/pallet.html',
        // replace: true,
        //transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function ($scope, $element, $attributes, ngModel) {
          ngModel.$render = function () {
            $scope.valueOptions = ngModel.$viewValue;
          };

          $element.addClass('pallet');
        }
      };
    });
})(angular);
