var assign = require('react/lib/Object.assign');

var Validator = function () {
  this.validationSchema = [];
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
  pattern: 'Does not match pattern',
  currency: 'Must be a valid currency',
  hexColor: 'Must be a valid hex color'
};

Validator.definitions = {
  email: function () {
    return {
      validate: this._validator.isEmail
    };
  },
  url: function (options) {
    return {
      validate: function (value) {
        return this._validator.isURL(value, options);
      }
    };
  },
  date: function () {
    return {
      validate: this._validator.isDate
    };
  },
  before: function (before) {
    return {
      validate: function (value) {
        return this._validator.isBefore(value, before);
      },
      message: (m) => m.replace('${before}', before)
    };
  },
  after: function (after) {
    return {
      validate: function (value) {
        return this._validator.isAfter(value, after);
      },
      message: (m) => m.replace('${after}', after)
    };
  },
  number: function () {
    return {
      validate: this._validator.isNumeric
    };
  },
  alpha: function () {
    return {
      validate: this._validator.isAlpha
    };
  },
  max: function (max) {
    return {
      validate: function (val) {
        return this._validator.isInt(val, {max}) || this._validator.isFloat(val, {max});
      },
      message: (m) => m.replace('${max}', max)
    };
  },
  min: function (min) {
    return {
      validate: function (val) {
        return this._validator.isInt(val, {min}) || this._validator.isFloat(val, {min});
      },
      message: (m) => m.replace('${min}', min)
    };
  },
  maxLength: function (max) {
    return {
      validate: function (val) {
        return this._validator.isLength(val, 0, max);
      },
      message: (m) => m.replace('${max}', max)
    };
  },
  minLength: function (min) {
    return {
      validate: function (val) {
        return this._validator.isLength(val, min);
      },
      message: (m) => m.replace('${min}', min)
    };
  },
  creditCard: function () {
    return {
      validate: this._validator.isCreditCard
    };
  },
  oneOf: function (allowed) {
    return {
      validate: (val) => this._validator.isIn(val, allowed),
      message: (m) => m.replace('${allowed}', allowed.join(', '))
    };
  },
  pattern: function (pattern) {
    return {
      validate: (val) => this._validator.matches(val, pattern)
    };
  },
  currency: function (options) {
    return {
      validate: function (value) {
        return this._validator.isCurrency(value, options);
      }
    };
  },
  hexColor: function () {
    return {
      validate: this._validator.isHexColor
    };
  },
  custom: function (definition) {
    return definition;
  }
};

Object.keys(Validator.definitions).forEach(key => {
  Validator[key] = Validator.prototype[key] = function () {
    var instance = this instanceof Validator ? this : new Validator();
    var args = Array.prototype.slice.call(arguments);
    var schema = Validator.definitions[key].apply(instance, arguments);

    var lastArg = arguments[arguments.length - 1];
    var customMessage = lastArg && typeof lastArg === 'object' && lastArg.message;

    // If the validation function specifies a function, run the message template
    // through it
    if (typeof schema.message === 'function') {
      var template = schema.message;
      schema.message = () => template.call(instance, customMessage || instance.messages[key] || '');
    } else {
      schema.message = () => customMessage || instance.messages[key] || '';
    }

    instance.validationSchema.push(schema);

    return instance;
  };
});

Validator.prototype.assert = function (value, context) {
  var results = this.validationSchema.map(definition => {
    var errorMessage = definition.message.call(this, value);
    return definition.validate.call(context || this, value) ? false : errorMessage;
  }).filter(error => error);
  return results.length ? results : false;
};


module.exports = Validator;
