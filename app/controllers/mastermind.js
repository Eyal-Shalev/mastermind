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

      $scope.game =game;

    }]);
})(angular);
