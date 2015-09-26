'use strict';

/**
 * Copies an object using the JSON stringify and parse functions
 * @param Object o
 */
var JSONCopy = function(o) {
  if (o !== undefined && o !== null)
    return JSON.parse(JSON.stringify(o));
  
  return null;
}

/**
 * @type {angular.Module}
 */
var mastermindGameEngine = angular.module('mastermind.game.engine', [])

/**
 * @var Object mastermindGameEngine.defaultSettings
 */
.value('defaultSettings', {
  valueOptions: [
    {label: 'Red'},
    {label: 'Brown'},
    {label: 'Green'},
    {label: 'Orange'},
    {label: 'Pink'},
    {label: 'Purple'},
    {label: 'Blue'},
    {label: 'Black'}
  ],
  unique: true,
  rowSize: 4,
  nullLabel: 'Select'
})

.factory('Game', ['defaultSettings', function(defaultSettings) {

  function isValid(game) {
    var selectedOptions = game.settings.valueOptions.reduce(function(acc, current) {
      return acc + (current.selected ? 1 : 0);
    }, 0);

    return selectedOptions === game.settings.rowSize;
  }

  function guess(game) {
    var turn = {
      age: game.tries++,
      guess: JSON.parse(JSON.stringify(game.turn)),
      hits: 0,
      partials: 0,
      success: false
    };

    turn.partials = game.answer.reduce(function(acc, current) {
      return acc += game.settings.valueOptions[current].selected ? 1 : 0;
    }, 0);

    // Counting the number of perfect hits
    turn.hits = game.answer.reduce(function(acc, current, index) {
      return acc += (current === game.turn[index].value);
    }, 0);

    turn.partials = turn.partials - turn.hits;

    turn.partialSuccess = ((turn.partials + turn.hits) === game.settings.rowSize);
    turn.success = (turn.hits === game.settings.rowSize);

    // Pushing the turn into the game history.
    game.history.push(turn);

    initTurn(game);
    initValueOptions(game)
  }

  function initTurn(game, turn) {
    // Initializing the turn array with the default values.
    for (var i = 0; i < game.settings.rowSize; i++) {
      // Initiate each cell in the turn row.
      game.turn[i] = {
        value: turn ? turn[i].value : (game.settings.unique ? -1 : 0),
        selected: false
      };
      if (turn) {
        game.settings.valueOptions[turn[i].value].selected = true;
      }
    };
  }

  function initValueOptions(game) {
    if (game.settings.unique) {
      game.settings.valueOptions[-1] = {label: game.settings.nullLabel, selected: true}
      // Make sure the row size is not wider then the number of available options.
      game.settings.rowSize = Math.min(game.settings.rowSize, game.settings.valueOptions.length);
      game.settings.valueOptions.forEach(function(option) {
        option.selected = false;
      })
    }
  }

  /**
   * Game constructor function
   * 
   * Available settings are:
   * - valueOptions: Array of Objects with a label string 
   * - Boolean unique: false,// true,
   * - Integer rowSize: 4
   * 
   * @param Object settings.
   * @see mastermindGameEngine.defaultSettings
   */
  return function Game(settings) {
    this.answer = [];
    this.turn = [];
    this.history = [];
    this.tries = 0;

    this.settings = settings || {};
    this.settings.__proto__ = defaultSettings;

    this.settings.valueOptions = JSONCopy(this.settings.valueOptions);

    initValueOptions(this);


    // Randomize an answer row.
    var answerOptions = this.settings.valueOptions.map(function(c, index) {return index});
    for (var i = 0; i < this.settings.rowSize; i++) {
      var numberOfOptions = answerOptions.length;
      var answerNum = Math.floor((Math.random() * numberOfOptions));
      this.answer[i] = answerOptions[answerNum];
      answerOptions.splice(answerNum,1);
    };

    // Initialize the turn.
    initTurn(this);

    this.isValid = function() {
      return isValid(this);
    };

    this.guess = function() {
      return guess(this);
    }

    this.initTurn = function(turn) {
      initTurn(this, turn);
    }

  };
}])