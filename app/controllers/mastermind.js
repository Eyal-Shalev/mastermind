(function (angular) {

  'use strict';

  angular.module('mastermind')

    .controller('GameCtrl', ['$scope', 'meta', 'gameFactory', function ($scope, meta, gameFactory) {
      var game =  new gameFactory({
        valueOptions: [
          {label: 'Indigo'},
          {label: 'Pink'},
          {label: 'Red'},
          {label: 'Green'},
          {label: 'Purple'},
          {label: 'Blue'},
          {label: 'Yellow'},
          {label: 'Orange'}
        ],
        unique: true,
        rowSize: 4,
        nullProperties: {
          label: 'Select',
          color: 'null'
        }
      });

      $scope.game = game;

      $scope.$watch('game.tries', function(newVal) {
        meta.title = "Mastermind | tries: " + newVal;
      });

    }]);
})(angular);
