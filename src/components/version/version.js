'use strict';

angular.module('mastermind.version', [
  'mastermind.version.interpolate-filter',
  'mastermind.version.version-directive'
])

.value('version', '0.1');
