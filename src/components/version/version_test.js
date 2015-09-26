'use strict';

describe('mastermind.version module', function() {
  beforeEach(module('mastermind.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
