'use strict'

/**
* anguler.meta Module
*
* Description
*/
var mastermindMeta = angular.module('mastermind.meta', [])
.value('name', "Master Mind")
.value('description', "The old Master Mind game.");

mastermindMeta.controller('meta', ['$scope', 'description', function($scope, description) {
  $scope.description = description;
  $scope.title = name;
}]);