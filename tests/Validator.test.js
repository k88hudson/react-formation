var should = require('should');

var Validator = require('../src/lib/Validator');

describe('Validator', function () {

  it('should chain multiple validations', function () {
    var v = Validator.oneOf(['asd@daddd.com', 'ad@dasd.com']).email();
    should.deepEqual(v.assert('foo'), ['Must be one of asd@daddd.com, ad@dasd.com', 'Must be an email']);
    should.deepEqual(v.assert('sad@boo.com'), ['Must be one of asd@daddd.com, ad@dasd.com']);
  });

  it('should allow overriding messages on constructor', function () {
    var oldMessage = Validator.messages.oneOf;
    Validator.messages.oneOf = 'Gotta be one of ${allowed}';
    var v = Validator.oneOf(['foo', 'bar']);
    should.deepEqual(v.assert('baz'), ['Gotta be one of foo, bar']);
    Validator.messages.oneOf = oldMessage;
  });

  it('should allow overriding messages on instance', function () {
    var v = Validator.oneOf(['foo', 'bar']);
    v.messages.oneOf = 'Foo!';
    should.deepEqual(v.assert('baz'), ['Foo!']);
    var v2 = Validator.oneOf(['foo', 'bar']);
    should.deepEqual(v2.assert('baz'), ['Must be one of foo, bar']);
  });

  describe('assert', function () {

    it('should use a message string if provided', function () {
      var customValidation = {
        validate: (value) => value === 'dd@dd.com',
        message: 'Not the right email'
      };
      var v = Validator.custom(customValidation);
      should.deepEqual(v.assert('dd@dd.com'), false);
      should.deepEqual(v.assert('ff'), ['Not the right email']);
    });

    it('should call a message function with the instance context', function () {
      var customValidation = {
        validate: (value) => value === 'dd@dd.com',
        message: function () {
          return this.messages.email;
        }
      };
      var v = Validator.custom(customValidation);
      should.deepEqual(v.assert('dd@dd.com'), false);
      should.deepEqual(v.assert('ff'), ['Must be an email']);
    });

    it('should call validate with the instance context', function () {
      var customValidation = {
        validate: function (value) {
          return this._validator.isEmail(value);
        },
        message: 'Not email!'
      };
      var v = Validator.custom(customValidation);
      should.deepEqual(v.assert('baz@bar.com'), false);
    });

    it('should call validate with custom context if provided', function () {
      var customValidation = {
        validate: function () {
          return this.foo === 100;
        },
        message: 'Wrong'
      };
      var v = Validator.custom(customValidation);
      function Foo() {
        this.foo = 100;
        should.deepEqual(v.assert('baz', this), false);
      }
      new Foo();
    });
  });

  describe('definitions', function () {
    var testData = {
      oneOf: [
        Validator.oneOf(['foo', 'bar']),
        ['foo', false],
        ['baz', ['Must be one of foo, bar']]
      ],
      number: [
        Validator.number(),
        ['1', false],
        ['1.1d', ['Must be a number']]
      ],
      url: [
        Validator.url(),
        ['foo.foo.com?asdd&asdad#adsda', false],
        ['foobaradsdd', ['Must be a URL']]
      ],
      date: [
        Validator.date(),
        ['January 9, 2013', false],
        ['foo', ['Must be a date']]
      ],
      before: [
        Validator.before('January 10, 2010'),
        ['January 9 2010', false],
        ['January 9 2011', ['Must be before January 10, 2010']]
      ],
      after: [
        Validator.after('January 10, 2010'),
        ['January 15 2010', false],
        ['February 8 2000', ['Must be after January 10, 2010']]
      ],
      alpha: [
        Validator.alpha(),
        ['aasdDSAasd', false],
        ['ad1asdd', ['Must be letters only (A-Z)']]
      ],
      email: [
        Validator.email(),
        ['aad@dasd.com', false],
        ['asdd.com', ['Must be an email']]
      ],
      creditCard: [
        Validator.creditCard(),
        ['4012888888881881', false],
        ['1231231232', ['Please enter a valid credit card']]
      ],
      max: [
        Validator.max(10),
        [9, false],
        [11, ['Must be less than 10']]
      ],
      min: [
        Validator.min(10),
        ['10', false],
        ['8', ['Must be greater than 10']]
      ],
      maxLength: [
        Validator.maxLength(5),
        ['abcde', false],
        ['asdadsadasda', ['Must be less than 5 characters']]
      ],
      minLength: [
        Validator.minLength(2),
        ['adasdasdasd', false],
        ['a', ['Must be at least 2 characters']]
      ],
      pattern: [
        Validator.pattern(/foo/),
        ['foo', false],
        ['bar', ['Does not match pattern']]
      ]
    };

    Object.keys(testData).forEach(key => {
      var data = testData[key];
      it('#' + key, function () {
        should.deepEqual(data[0].assert(data[1][0]), data[1][1]);
        should.deepEqual(data[0].assert(data[2][0]), data[2][1]);
      });
    });

    it('#custom', function () {
      var customValidation = {
        validate: (value) => value === 'foo',
        message: 'Not foo'
      };
      var v = Validator.custom(customValidation);
      should.deepEqual(v.assert('foo'), false);
      should.deepEqual(v.assert('ff'), ['Not foo']);
    });
  });

});
