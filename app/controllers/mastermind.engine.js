(function (angular) {

  'use strict';

  /**
   * Creates a new Object with the parent as the prototype that contains the properties of the child object.
   * @param {Object} parent
   * @param {Object} child
   * @return {Object}
   */
  function extend(parent, child) {
    return Object.create(parent, Object.getOwnPropertyNames(child).reduce(function (acc, name) {
      acc[name] = Object.getOwnPropertyDescriptor(child, name);
      return acc;
    }, {}));
  }

  /**
   * Syntactic Sugar for constructor.prototype = prototype;
   * @param {Function} constructor
   * @param {Object} prototype
   * @return {Function}
   */
  function proto(constructor, prototype) {
    constructor.prototype = prototype;
    return constructor;
  }

  /**
   * Returns the property descriptors of a given object.
   * @param target
   * @return {Object} Property descriptors
   */
  function getProperties(target) {
    target = target || this;
    var names = Object.getOwnPropertyNames(target);
    var properties = {};
    names.forEach(function (name) {
      properties[name] = Object.getOwnPropertyDescriptor(target, name);
    });
    return properties;
  }

  /**
   * Syntactic sugar for Object.defineProperties(target, properties)
   * @param {Object} properties
   * @param {Object} target
   * @return {Object}
   */
  function define(properties, target) {
    target = target || this;
    Object.defineProperties(target, properties);
    return target;
  }

  /**
   * Syntactic sugar for Object.defineProperties(target, properties)
   * @param {Object} from
   * @param {Object} to
   * @return {Object}
   */
  function combine(from, to) {
    to = to || this;
    Object.defineProperties(to, getProperties(from));
    return to;
  }

  /**
   * @constructor
   * @var Turn
   * @type {Function}
   */
  var Turn = function Turn(game) {
    var list = new Array(game.settings.rowSize);
    var defaultValue = game.settings.unique ? -1 : 0;

    var valueOptions = game.settings.valueOptions;

    define.bind(this)({
      set: {
        /**
         * @function sets new values for this turn.
         * @param {Number[]} values
         */
        value: function (values) {
          for (var i = 0; i < game.settings.rowSize; i++) {
            // Initiate each cell in the turn row.
            list[i] = {
              value: values ? values[i] : valueOptions[defaultValue]
            };
            if (values) {
              values[i].selected = true;
            }
          }
        }
      },
      get: {
        value: function (index) {
          return list[index];
        }
      },
      values: {
        get: function () {
          return list.map(function (o) {
            return o.value;
          });
        }
      },
      lockedResults: {
        value: false,
        writable: true
      },
      lockResults: {
        value: function() {
          this.lockedResults = this.results;
        }
      },
      results: {
        get: function () {
          var hits, partials, values = this.values;

          if (this.lockedResults) {
            return this.lockedResults;
          }
          else {
            // Counting the number of perfect hits
            hits = game.answer.reduce(function (acc, current, index) {
              return acc + (valueOptions[current] === values[index]);
            }, 0);

            partials = game.answer.reduce(function (acc, current) {
              return acc + (valueOptions[current].selected ? 1 : 0);
            }, 0 - hits);

            return {
              hits: hits,
              partials: partials,
              victory: hits === list.length,
              partialVictory: (partials + hits) === list.length
            };
          }
        }
      },
      age: {
        value: game.tries
      },
      duplicate: {
        value: function () {
          var tmp = new Turn(game);
          tmp.set(this.values);
          return tmp;
        }
      },
      isValid: {
        get: function () {
          var selectedOptions = game.settings.valueOptions.reduce(function (acc, current) {
            return acc + (current.selected ? 1 : 0);
          }, 0);
          return selectedOptions === game.settings.rowSize;
        }
      }
    });

    for (var i = 0; i < game.settings.rowSize; i++) {
      (function (index, target) {
        Object.defineProperty(target, index, {
          get: function () {
            return list[index];
          },
          enumerable: true
        });
      })(i, this)
    }

    this.set();
  };

  /**
   * @constructor
   * @var History
   * @type {Function}
   */
  var History = function History() {

    var length = 0;

    define.bind(this)({
      add: {
        value: function (turn) {
          //if (!(turn instanceof  Turn)) {
          //  throw TypeError('History.add must receive objects of type Turn');
          //}
          Object.defineProperty(this, length, {
            get: function () {
              return turn;
            },
            enumerable: true
          });
          length++;
        }
      },
      length: {
        get: function () {
          return length;
        }
      }
    });

  };

  /**
   * @var defaultSettings
   * @type {{valueOptions: {label: string}[], unique: boolean, rowSize: number, nullProperties: Object}}
   */
  var defaultSettings = {
    valueOptions: [
      {label: 'Option A'},
      {label: 'Option B'},
      {label: 'Option C'},
      {label: 'Option D'}
    ],
    unique: true,
    rowSize: 4,
    nullProperties: {
      label: 'Select'
    }
  };
  Object.freeze(defaultSettings);

  // Registers the factory service for the mastermind game.
  angular.module('mastermind').factory('gameFactory', function () {


    /**
     * @class Game
     *
     * @param {Object} settings Overrides the default settings
     * @see Game.settings
     */
    return function Game(settings) {

      // PRIVATE VARIABLES

      /**
       * @var answer Contains an array of indexes in this.settings.valueOptions
       * @see defaultSettings.valueOptions
       * @type {number[]}
       */
      var answer = [], turn, history;

      // PUBLIC VARIABLES
      define.bind(this)({
        settings: {
          get: function () {
            return settings;
          }
        },
        turn: {
          get: function () {
            return turn;
          }
        },
        history: {
          get: function () {
            return history;
          }
        },
        tries: {
          get: function () {
            return history.length;
          }
        },
        answer: {
          get: function() {
            return answer;
          }
        }
      });

      // PRIVATE FUNCTIONS

      /**
       * Initializes the value options of the targeted game.
       * @param {Game} target
       */
      var initValueOptions = function (target) {
        target = target || this;
        if (target.settings.unique) {
          target.settings.valueOptions[-1] = combine(target.settings.nullProperties, {selected: true});
          // Make sure the row size is not wider then the number of available options.
          target.settings.rowSize = Math.min(target.settings.rowSize, target.settings.valueOptions.length);
          target.settings.valueOptions.forEach(function (option) {
            option.selected = false;
          });
        }
      }.bind(this);

      // PUBLIC METHODS
      define.bind(this)({
        guess: {
          /**
           * @function guess Use this method to end a turn and calculate the hits and the partials.
           */
          value: function guess() {
            var turn = this.turn.duplicate();
            turn.lockResults();
            // Pushing the turn into the game history.
            this.history.add(turn);

            // Initializing a new turn
            this.turn.set();
            initValueOptions();

            return turn;
          }
        }
      });


      settings = extend(defaultSettings, settings);

      history = new History();

      initValueOptions();
      turn = new Turn(this);

      // Randomize an answer row.
      var answerOptions = settings.valueOptions.map(function (c, index) {
        return index;
      });

      for (var i = 0; i < settings.rowSize; i++) {
        var answerNum = Math.floor((Math.random() * answerOptions.length));
        answer[i] = answerOptions[answerNum];
        answerOptions.splice(answerNum, 1);
      }

      // Initialize the turn.

    };
  });

})(angular);
