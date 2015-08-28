var assign = require('react/lib/Object.assign');

var Validator = function () {
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
  alpha: function () {
    return {
      validate: this._validator.isAlpha,
      message: () => this.messages.alpha
    };
  },
  number: function () {
    return {
      validate: this._validator.isNumeric,
      message: () => this.messages.number
    };
  },
  email: function () {
    return {
      validate: this._validator.isEmail,
      message: () => this.messages.email
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
