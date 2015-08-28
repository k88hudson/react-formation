'use strict';

var Validator = function Validator() {
  this.schema = [];
};

var validators = {
  string: function string() {
    return function (val) {
      return typeof val === 'string';
    };
  },
  number: function number() {
    return function (val) {
      return typeof val === 'number';
    };
  }
};

Validator.prototype.assert = function (value) {
  var results = this.schema.map(function (validator) {
    return validator(value);
  });
  return results;
};

Object.keys(validators).forEach(function (key) {
  Validator.prototype[key] = function () {
    this.schema.push(validators[key](arguments));
    return this;
  };
});

module.exports = Validator;