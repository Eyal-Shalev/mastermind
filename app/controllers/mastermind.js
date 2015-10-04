(function (angular) {

  'use strict';

  angular.module('mastermind')

    .controller('GameCtrl', ['$scope', 'gameFactory', function ($scope, gameFactory) {
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
      game.turn.set([game.settings.valueOptions[0], game.settings.valueOptions[2], game.settings.valueOptions[1], game.settings.valueOptions[3]]);
      game.guess();
      game.turn.set([game.settings.valueOptions[0], game.settings.valueOptions[2], game.settings.valueOptions[1], game.settings.valueOptions[3]]);
      game.guess();
      game.turn.set([game.settings.valueOptions[0], game.settings.valueOptions[2], game.settings.valueOptions[1], game.settings.valueOptions[3]]);
      game.guess();
      game.turn.set([game.settings.valueOptions[0], game.settings.valueOptions[2], game.settings.valueOptions[1], game.settings.valueOptions[3]]);
      game.guess();
      game.turn.set([game.settings.valueOptions[4], game.settings.valueOptions[7], game.settings.valueOptions[5], game.settings.valueOptions[6]]);
      game.guess();

      $scope.game =game;

    }]);
})(angular);
