var assign = require('react/lib/Object.assign');

var Validator = function () {
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
  email: function () {
    return {
      validate: this._validator.isEmail,
      message: () => this.messages.email
    };
  },
  url: function (options) {
    return {
      validate: function (value) {
        return this._validator.isURL(value, options);
      },
      message: () => this.messages.url
    };
  },
  date: function () {
    return {
      validate: this._validator.isDate,
      message: () => this.messages.date
    };
  },
  before: function (before) {
    return {
      validate: function (value) {
        return this._validator.isBefore(value, before);
      },
      message: () => this.messages.before.replace('${before}', before)
    };
  },
  after: function (after) {
    return {
      validate: function (value) {
        return this._validator.isAfter(value, after);
      },
      message: () => this.messages.after.replace('${after}', after)
    };
  },
  number: function () {
    return {
      validate: this._validator.isNumeric,
      message: () => this.messages.number
    };
  },
  alpha: function () {
    return {
      validate: this._validator.isAlpha,
      message: () => this.messages.alpha
    };
  },
  max: function (max) {
    return {
      validate: function (val) {
        return this._validator.isInt(val, {max}) || this._validator.isFloat(val, {max});
      },
      message: () => this.messages.max.replace('${max}', max)
    };
  },
  min: function (min) {
    return {
      validate: function (val) {
        return this._validator.isInt(val, {min}) || this._validator.isFloat(val, {min});
      },
      message: () => this.messages.min.replace('${min}', min)
    };
  },
  maxLength: function (max) {
    return {
      validate: function (val) {
        return this._validator.isLength(val, 0, max);
      },
      message: () => this.messages.maxLength.replace('${max}', max)
    };
  },
  minLength: function (min) {
    return {
      validate: function (val) {
        return this._validator.isLength(val, min);
      },
      message: () => this.messages.minLength.replace('${min}', min)
    };
  },
  creditCard: function () {
    return {
      validate: this._validator.isCreditCard,
      message: () => this.messages.creditCard
    };
  },
  oneOf: function (allowed) {
    return {
      validate: (val) => this._validator.isIn(val, allowed),
      message: () => this.messages.oneOf.replace('${allowed}', allowed.join(', '))
    };
  },
  pattern: function (pattern) {
    return {
      validate: (val) => this._validator.matches(val, pattern),
      message: () => this.messages.pattern
    };
  },
  custom: function (definition) {
    return definition;
  }
};

Object.keys(Validator.definitions).forEach(key => {
  Validator[key] = Validator.prototype[key] = function () {
    var instance = this instanceof Validator ? this : new Validator();
    instance.schema.push(Validator.definitions[key].apply(instance, arguments));
    return instance;
  };
});

Validator.prototype.assert = function (value, context) {
  var results = this.schema.map(definition => {
    var errorMessage = typeof definition.message === 'function' ? definition.message.call(this, value) : definition.message;
    return definition.validate.call(context || this, value) ? false : errorMessage;
  }).filter(error => error);
  return results.length ? results : false;
};


module.exports = Validator;
