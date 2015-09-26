'use strict';

// Declare app level module which depends on views, and components
var mastermind = angular.module('mastermind', [
  'ngRoute',
  'ngMaterial',
  'mastermind.cell',
  'mastermind.game',
  'mastermind.game.engine'
])
.value('meta', {
  name: 'Master Mind',
  title: 'Master Mind',
  description: 'The old Master Mind game.'
})
.controller('metaCtrl', function($scope, meta) {
  $scope.meta = meta;
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/game'});
}]);