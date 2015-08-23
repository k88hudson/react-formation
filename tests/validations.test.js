var should = require('should');

describe('validations', function () {
  var validations = require('../src/lib/validations');

  function check(type, valid, invalid) {
    valid.forEach(value => {
      it('should return false for ' + value, function () {
        should.equal(validations[type](value), false);
      });
    });
    invalid.forEach(value => {
      it('should return an error for ' + value, function () {
        should.ok(typeof validations[type](value) === 'string');
      });
    });
  }

  describe('number', function () {
    check('number', [42, '42'], ['1.323', 'hello']);
  });

  describe('email', function () {
    check('email',
      ['hello@world.com', 'googl_Ded123ad@gmail.biz'],
      ['asdasd', 'asds@dasda', 'adsasdd.com']);
  });

});