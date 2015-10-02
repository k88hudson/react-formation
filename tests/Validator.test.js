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
      should.deepEqual(v.assert('dd@dd.com'), true);
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
      should.deepEqual(v.assert('dd@dd.com'), true);
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
      should.deepEqual(v.assert('baz@bar.com'), true);
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
        should.deepEqual(v.assert('baz', this), true);
      }
      new Foo();
    });
  });

  describe('definitions', function () {
    var testData = {
      oneOf : {
        validatorTerm: Validator.oneOf(['foo', 'bar']),
        valid: ['foo','bar'],
        invalid: ['baz','foi'],
        invalidMessage: ['Must be one of foo, bar']
      },
      number : {
        validatorTerm: Validator.number(),
        valid: ['1','42','987'],
        invalid: ['1.1d','j3883','3897h38'],
        invalidMessage: ['Must be a number']
      },
      url : {
        validatorTerm: Validator.url(),
        valid: ['foo.foo.com?asdd&asdad#adsda','http://www.google.ca','torontobluejaysworldchampionship.com'],
        invalid: ['foobaradsdd','adalova..com','next..test.com'],
        invalidMessage: ['Must be a URL']
      },
      date: {
        validatorTerm: Validator.date(),
        valid: ['January 9, 2013','December 20, 1903'],
        invalid: ['foo', 'Jan 2012 1202'],
        invalidMessage: ['Must be a date']
      },
      before: {
        validatorTerm: Validator.before('January 10, 2010'),
        valid: ['January 9 2010'],
        invalid: ['January 9 2011'],
        invalidMessage: ['Must be before January 10, 2010']
      },
      after: {
        validatorTerm: Validator.after('January 10, 2010'),
        valid: ['January 15 2010'],
        invalid: ['February 8 2000'],
        invalidMessage: ['Must be after January 10, 2010']
      },
      alpha: {
        validatorTerm: Validator.alpha(),
        valid: ['aasdDSAasd','la','Ada'],
        invalid: ['ad1asdd','Ada1ovelace'],
        invalidMessage: ['Must be letters only (A-Z)']
      },
      email: {
        validatorTerm: Validator.email(),
        valid: ['aad@dasd.com'],
        invalid: ['asdd.com','ada@lovelace..com','bar@@foo.com'],
        invalidMessage: ['Must be an email']
      },
      creditCard: {
        validatorTerm: Validator.creditCard(),
        valid: ['4012888888881881'],
        invalid: ['1231231232','11111888888881881333'],
        invalidMessage: ['Please enter a valid credit card']
      },
      max: {
        validatorTerm: Validator.max(10),
        valid: [9],
        invalid: [11],
        invalidMessage: ['Must be less than 10']
      },
      min: {
        validatorTerm: Validator.min(10),
        valid: ['10'],
        invalid: ['8'],
        invalidMessage: ['Must be greater than 10']
      },
      maxLength: {
        validatorTerm: Validator.maxLength(5),
        valid: ['abcde'],
        invalid: ['asdadsadasda'],
        invalidMessage: ['Must be less than 5 characters']
      },
      minLength: {
        validatorTerm: Validator.minLength(2),
        valid: ['adasdasdasd'],
        invalid: ['a'],
        invalidMessage: ['Must be at least 2 characters']
      },
      pattern: {
        validatorTerm: Validator.pattern(/foo/),
        valid: ['foo'],
        invalid: ['bar'],
        invalidMessage: ['Does not match pattern']
      },
      currency: {
        validatorTerm: Validator.currency(),
        valid: ['42.42','2897.99','2829873'],
        invalid: ['42..42','..38','32.3'],
        invalidMessage: ['Must be a valid currency']
      },
      hexColor: {
        validatorTerm: Validator.hexColor(),
        valid: ['1f1f1F'],
        invalid: ['030k93l'],
        invalidMessage: ['Must be a valid hex color']
      }
    };

    Object.keys(testData).forEach(key => {
      var data = testData[key];
      it('#' + key, () => {
        data.valid.forEach( testCase => {
          should.deepEqual(data.validatorTerm.assert(testCase), true);
        });
        data.invalid.forEach( testCase => {
          should.deepEqual(data.validatorTerm.assert(testCase), data.invalidMessage );
        });
      });
    });

    it('#custom', function () {
      var customValidation = {
        validate: (value) => value === 'foo',
        message: 'Not foo'
      };
      var v = Validator.custom(customValidation);
      should.deepEqual(v.assert('foo'), true);
      should.deepEqual(v.assert('ff'), ['Not foo']);
    });
  });

});
