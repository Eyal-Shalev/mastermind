'use strict';

/**
 * @ngdoc overview
 * @name mastermindApp
 * @description
 * # mastermindApp
 *
 * Main module of the application.
 */
angular
  .module('mastermind', [
    'ngAria',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/game', {
        templateUrl: 'templates/mastermind.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/game'
      });
  });
