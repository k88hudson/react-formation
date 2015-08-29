'use strict';

var assign = require('react/lib/Object.assign');

var Validator = function Validator() {
  this.schema = [];
  this._validator = require('validator');
  this.messages = assign({}, Validator.messages);
};

Validator.messages = {
  alpha: 'Must be letters only (A-Z)',
  number: 'Must be a number',
  url: 'Must be a URL',
  date: 'Must be a date',
  before: 'Must be before ${before}',
  after: 'Must be after ${after}',
  oneOf: 'Must be one of ${allowed}',
  email: 'Must be an email',
  creditCard: 'Please enter a valid credit card',
  max: 'Must be less than ${max}',
  min: 'Must be greater than ${min}',
  maxLength: 'Must be less than ${max} characters',
  minLength: 'Must be at least ${min} characters',
  pattern: 'Does not match pattern'
};

Validator.definitions = {
  email: function email() {
    var _this = this;

    return {
      validate: this._validator.isEmail,
      message: function message() {
        return _this.messages.email;
      }
    };
  },
  url: function url(options) {
    var _this2 = this;

    return {
      validate: function validate(value) {
        return this._validator.isURL(value, options);
      },
      message: function message() {
        return _this2.messages.url;
      }
    };
  },
  date: function date() {
    var _this3 = this;

    return {
      validate: this._validator.isDate,
      message: function message() {
        return _this3.messages.date;
      }
    };
  },
  before: function before(_before) {
    var _this4 = this;

    return {
      validate: function validate(value) {
        return this._validator.isBefore(value, _before);
      },
      message: function message() {
        return _this4.messages.before.replace('${before}', _before);
      }
    };
  },
  after: function after(_after) {
    var _this5 = this;

    return {
      validate: function validate(value) {
        return this._validator.isAfter(value, _after);
      },
      message: function message() {
        return _this5.messages.after.replace('${after}', _after);
      }
    };
  },
  number: function number() {
    var _this6 = this;

    return {
      validate: this._validator.isNumeric,
      message: function message() {
        return _this6.messages.number;
      }
    };
  },
  alpha: function alpha() {
    var _this7 = this;

    return {
      validate: this._validator.isAlpha,
      message: function message() {
        return _this7.messages.alpha;
      }
    };
  },
  max: function max(_max) {
    var _this8 = this;

    return {
      validate: function validate(val) {
        return this._validator.isInt(val, { max: _max }) || this._validator.isFloat(val, { max: _max });
      },
      message: function message() {
        return _this8.messages.max.replace('${max}', _max);
      }
    };
  },
  min: function min(_min) {
    var _this9 = this;

    return {
      validate: function validate(val) {
        return this._validator.isInt(val, { min: _min }) || this._validator.isFloat(val, { min: _min });
      },
      message: function message() {
        return _this9.messages.min.replace('${min}', _min);
      }
    };
  },
  maxLength: function maxLength(max) {
    var _this10 = this;

    return {
      validate: function validate(val) {
        return this._validator.isLength(val, 0, max);
      },
      message: function message() {
        return _this10.messages.maxLength.replace('${max}', max);
      }
    };
  },
  minLength: function minLength(min) {
    var _this11 = this;

    return {
      validate: function validate(val) {
        return this._validator.isLength(val, min);
      },
      message: function message() {
        return _this11.messages.minLength.replace('${min}', min);
      }
    };
  },
  creditCard: function creditCard() {
    var _this12 = this;

    return {
      validate: this._validator.isCreditCard,
      message: function message() {
        return _this12.messages.creditCard;
      }
    };
  },
  oneOf: function oneOf(allowed) {
    var _this13 = this;

    return {
      validate: function validate(val) {
        return _this13._validator.isIn(val, allowed);
      },
      message: function message() {
        return _this13.messages.oneOf.replace('${allowed}', allowed.join(', '));
      }
    };
  },
  pattern: function pattern(_pattern) {
    var _this14 = this;

    return {
      validate: function validate(val) {
        return _this14._validator.matches(val, _pattern);
      },
      message: function message() {
        return _this14.messages.pattern;
      }
    };
  },
  custom: function custom(definition) {
    return definition;
  }
};

Object.keys(Validator.definitions).forEach(function (key) {
  Validator[key] = Validator.prototype[key] = function () {
    var instance = this instanceof Validator ? this : new Validator();
    instance.schema.push(Validator.definitions[key].apply(instance, arguments));
    return instance;
  };
});

Validator.prototype.assert = function (value, context) {
  var _this15 = this;

  var results = this.schema.map(function (definition) {
    var errorMessage = typeof definition.message === 'function' ? definition.message.call(_this15, value) : definition.message;
    return definition.validate.call(context || _this15, value) ? false : errorMessage;
  }).filter(function (error) {
    return error;
  });
  return results.length ? results : false;
};

module.exports = Validator;