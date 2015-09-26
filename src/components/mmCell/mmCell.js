'use strict';

/**
* mastermind.cell Module
*
* A single master mind cell.
* Available attributes:
* - value
*/
angular.module('mastermind.cell', ['mastermind.pallet', 'ngMaterial'])

.directive('mmCell', [function() {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.openPallet = function() {
        $scope.cell.selected = !$scope.cell.selected;
        $scope.game.settings.valueOptions[$scope.cell.value].selected = false;
        $scope.game.selecting = true;
      }
      $scope.select = function(value) {
        if ($scope.game.settings.unique) {
          $scope.game.settings.valueOptions[value].selected = true;
        }
        $scope.cell.value = value;
        $scope.game.selecting = false;
        $scope.cell.selected = false;
      }
      $scope.label = function(cell) {
        return $scope.game.settings.valueOptions[cell.value].label;
      }
      $scope.disabled = $attrs.disabled != null;
    },
    require: '^ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: '..//mmCell/mmCell.html',
    // replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    // link: function($scope, iElm, iAttrs, ngModelCtrl) {
    //   $scope.disabled = iAttrs.disabled != null;
    // }
  };
}]);