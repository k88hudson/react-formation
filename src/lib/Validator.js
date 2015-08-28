var validator = require('validator');

var Validator = function () {
  this.schema = [];
};

var definitions = {
  alpha: function () {
    return {
      validate: validator.isAlpha,
      message: 'Must be a string'
    };
  },
  int: function () {
    return {
      validate: validator.isInt,
      message: 'Must be a number'
    };
  },
  custom: function (definition) {
    return definition;
  },
  oneOf: function (allowed) {
    return {
      validate: (val) => validator.isIn(val, allowed),
      message: `Must be one of ${allowed.join(', ')}`
    };
  }
};

Object.keys(definitions).forEach(key => {
  Validator.prototype[key] = function () {
    console.log('args', arguments);
    this.schema.push(definitions[key].apply(null, arguments));
    return this;
  };
});

Validator.prototype.assert = function (value) {
  var results = this.schema.map(definition => {
    return definition.validate(value) ? false : definition.message;
  });
  return results;
};


module.exports = Validator;
