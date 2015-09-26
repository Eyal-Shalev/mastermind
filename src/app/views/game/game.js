'use strict';

angular.module('mastermind.game', ['mastermind', 'mastermind.cell', 'mastermind.game.engine', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: '/game.html',
    controller: 'GameCtrl'
  });
}])

.controller('GameCtrl', ['$scope', 'Game', 'meta', function($scope, Game, meta) {
  $scope.game = new Game({
    valueOptions: [
      {label: 'Red'},
      {label: 'Brown'},
      {label: 'Green'},
      {label: 'Orange'},
      {label: 'Pink'},
      {label: 'Purple'},
      {label: 'Blue'},
      {label: 'Black'},
      {label: 'Pink'},
      {label: 'Purple'},
      {label: 'Blue'},
      {label: 'Black'}
    ],
    unique: true,
    rowSize: 6,
    nullLabel: 'Select'
  });
  $scope.isValid = function() {
    return $scope.game.isValid();
  }
  $scope.$watch('game', function(game, oldVal){
      meta.title = meta.name + ' | tries: ' + game.tries;
  }, true);
  
}])