'use strict';

module.exports = {

  linkField: function linkField(key) {
    if (!this.schema[key]) throw new Error('No value "' + key + '" exists in the schema');
    return this.linkState(key);
  },

  getValues: function getValues() {
    var _this = this;

    var values = {};
    Object.keys(this.schema).forEach(function (key) {
      if (typeof _this.linkField(key).value === 'undefined') return;
      values[key] = _this.linkField(key).value;
    });
    return values;
  },

  submitGroup: function submitGroup(group, onSuccess, onError) {
    var _this2 = this;

    var dirtyFields = this.state.dirtyFields;

    Object.keys(this.schema).forEach(function (key) {
      if (_this2.schema[key].group === group) dirtyFields[key] = true;
    });

    this.setState({ dirtyFields: dirtyFields });

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
    var dirtyFields = this.state.dirtyFields;
    Object.keys(this.schema).forEach(function (key) {
      dirtyFields[key] = true;
    });

    this.setState({
      dirtyFields: dirtyFields,
      didSubmit: true
    });

    if (!this.isValid()) return;

    var data = {};

    Object.keys(this.schema).forEach(function (key) {
      if (typeof _this3.state[key] !== 'undefined') data[key] = _this3.state[key];
    });

    if (this.onSuccess) {
      this.onSuccess(data);
    }
  },

  validations: require('./validations'),

  validateField: function validateField(key) {
    var errors = [];
    var schema = this.schema[key];
    var currentValue = this.state[key];
    var label = schema.label || key;

    if (schema.required === true && !currentValue) errors.push(label + ' is required');
    if (typeof schema.required === 'function') {
      var isConditionallyRequred = schema.required.bind(this)();
      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
    }
    if (currentValue && typeof schema.type === 'string' && this.validations[schema.type]) {
      var typeError = this.validations[schema.type](currentValue);
      if (typeError) errors.push(typeError);
    }
    if (currentValue && typeof schema.type === 'function') {
      var typeError = schema.type(currentValue);
      if (typeError) errors.push(typeError);
    }
    if (!errors.length) return false;
    return errors;
  },

  didSubmit: function didSubmit(field) {
    if (!field) return this.state.didSubmit;
    return this.state.dirtyFields[field];
  },

  isGroupValid: function isGroupValid(groupName) {
    var _this4 = this;

    var isValid = true;
    var fields = Object.keys(this.schema).filter(function (key) {
      return _this4.schema[key].group === groupName;
    });
    fields.forEach(function (key) {
      if (_this4.validateField(key)) isValid = false;
    });
    return isValid;
  },

  isValid: function isValid() {
    var _this5 = this;

    var isValid = true;
    Object.keys(this.schema).forEach(function (key) {
      if (_this5.validateField(key)) isValid = false;
    });
    return isValid;
  }
};