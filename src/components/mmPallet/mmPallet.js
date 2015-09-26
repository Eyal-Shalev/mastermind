'use strict';

/**
* mastermind.cell Module
*
* A single master mind cell.
* Available attributes:
* - value
*/
angular.module('mastermind.pallet', ['ngMaterial'])

.directive('mmPallet', [function() {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {
    //   $scope.openPallet = function() {

    //   }
    // },
    require: '^mmCell', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: '..//mmPallet/mmPallet.html',
    // replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, mmCellCtrl) {
        
    }
  };
}]);