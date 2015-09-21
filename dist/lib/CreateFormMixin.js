'use strict';

var Validator = require('./Validator');

module.exports = {

  linkField: function linkField(key) {
    if (!this.__schema[key]) throw new Error('No value "' + key + '" exists in the schema');
    return this.linkState(key);
  },

  getValues: function getValues() {
    var _this = this;

    var values = {};
    Object.keys(this.__schema).forEach(function (key) {
      if (typeof _this.linkField(key).value === 'undefined') return;
      values[key] = _this.linkField(key).value;
    });
    return values;
  },

  submitGroup: function submitGroup(group, onSuccess, onError) {
    var _this2 = this;

    var __dirtyFields = this.state.__dirtyFields;

    Object.keys(this.__schema).forEach(function (key) {
      if (_this2.__schema[key].group === group) __dirtyFields[key] = true;
    });

    this.setState({ __dirtyFields: __dirtyFields });

    // TODO return values
    if (this.isGroupValid(group)) {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  },

  submitForm: function submitForm(e) {
    var _this3 = this;

    if (e) e.preventDefault();

    // Make all fields dirty
    var __dirtyFields = this.state.__dirtyFields;
    Object.keys(this.__schema).forEach(function (key) {
      __dirtyFields[key] = true;
    });

    this.setState({
      __dirtyFields: __dirtyFields,
      __didSubmit: true
    });

    if (!this.isValid()) return;

    var data = {};

    Object.keys(this.__schema).forEach(function (key) {
      if (typeof _this3.state[key] !== 'undefined') data[key] = _this3.state[key];
    });

    if (this.onSuccess) {
      this.onSuccess(data);
    }
  },

  validateField: function validateField(key) {
    var errors = [];
    var schema = this.__schema[key];
    var currentValue = this.state[key];
    var label = schema.label || key;

    if (schema.type) {
      console.warn('Using "type" in your schema is deprecated. Please use "validations" instead.');
      schema.validations = schema.type;
    }

    if (schema.required === true && !currentValue) errors.push(label + ' is required');
    if (typeof schema.required === 'function') {
      var isConditionallyRequred = schema.required.bind(this)();
      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
    }
    if (currentValue && schema.validations instanceof Validator) {
      var typeError = schema.validations.assert(currentValue);
      if (typeError) errors = errors.concat(typeError);
    } else if (currentValue && typeof schema.validations === 'string' && Validator[schema.validations]) {
      var typeError = Validator[schema.validations]().assert(currentValue);
      if (typeError) errors = errors.concat(typeError);
    } else if (currentValue && typeof schema.validations === 'function') {
      var typeError = schema.validations.call(this, currentValue);
      if (typeError) errors.push(typeError);
    }

    return errors.length ? errors : false;
  },

  didSubmit: function didSubmit(field) {
    if (!field) return this.state.__didSubmit;
    return this.state.__dirtyFields[field];
  },

  isGroupValid: function isGroupValid(groupName) {
    var _this4 = this;

    var isValid = true;
    var fields = Object.keys(this.__schema).filter(function (key) {
      return _this4.__schema[key].group === groupName;
    });
    fields.forEach(function (key) {
      if (_this4.validateField(key)) isValid = false;
    });
    return isValid;
  },

  isValid: function isValid() {
    var _this5 = this;

    var isValid = true;
    Object.keys(this.__schema).forEach(function (key) {
      if (_this5.validateField(key)) isValid = false;
    });
    return isValid;
  }
};