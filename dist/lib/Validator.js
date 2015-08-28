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
  oneOf: 'Must be one of ${allowed}',
  email: 'Must be an email',
  creditCard: 'Please enter a valid credit card'
};

Validator.definitions = {
  alpha: function alpha() {
    var _this = this;

    return {
      validate: this._validator.isAlpha,
      message: function message() {
        return _this.messages.alpha;
      }
    };
  },
  number: function number() {
    var _this2 = this;

    return {
      validate: this._validator.isNumeric,
      message: function message() {
        return _this2.messages.number;
      }
    };
  },
  email: function email() {
    var _this3 = this;

    return {
      validate: this._validator.isEmail,
      message: function message() {
        return _this3.messages.email;
      }
    };
  },
  creditCard: function creditCard() {
    var _this4 = this;

    return {
      validate: this._validator.isCreditCard,
      message: function message() {
        return _this4.messages.creditCard;
      }
    };
  },
  oneOf: function oneOf(allowed) {
    var _this5 = this;

    return {
      validate: function validate(val) {
        return _this5._validator.isIn(val, allowed);
      },
      message: function message() {
        return _this5.messages.oneOf.replace('${allowed}', allowed.join(', '));
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
  var _this6 = this;

  var results = this.schema.map(function (definition) {
    var errorMessage = typeof definition.message === 'function' ? definition.message.call(_this6, value) : definition.message;
    return definition.validate.call(context || _this6, value) ? false : errorMessage;
  }).filter(function (error) {
    return error;
  });
  return results.length ? results : false;
};

module.exports = Validator;