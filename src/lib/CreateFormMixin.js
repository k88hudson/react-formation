var Validator = require('./Validator');

module.exports = {

  linkField: function (key) {
    if (!this.__schema[key]) throw new Error('No value "' + key + '" exists in the schema');
    return this.linkState(key);
  },

  getValues: function () {
    var values = {};
    Object.keys(this.__schema).forEach(key => {
      if (typeof this.linkField(key).value === 'undefined') return;
      values[key] = this.linkField(key).value;
    });
    return values;
  },

  submitGroup: function (group, onSuccess, onError) {

    var __dirtyFields = this.state.__dirtyFields;

    Object.keys(this.__schema).forEach(key => {
      if (this.__schema[key].group === group) __dirtyFields[key] = true;
    });

    this.setState({__dirtyFields});

    // TODO return values
    if (this.isGroupValid(group)) {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  },

  submitForm: function(e) {

    if (e) e.preventDefault();

    // Make all fields dirty
    var __dirtyFields = this.state.__dirtyFields;
    Object.keys(this.__schema).forEach(key => {
      __dirtyFields[key] = true;
    });

    this.setState({
      __dirtyFields,
      __didSubmit: true
    });

    if (!this.isValid()) return;

    var data = {};

    Object.keys(this.__schema).forEach(key => {
      if (typeof this.state[key] !== 'undefined') data[key] = this.state[key];
    });

    if (this.onSuccess) {
      this.onSuccess(data);
    }
  },

  validateField: function (key) {
    var errors = [];
    var schema = this.__schema[key];
    var currentValue = this.state[key];
    var label = schema.label || key;

    if (schema.required === true && !currentValue) errors.push(label + ' is required');
    if (typeof schema.required === 'function') {
      var isConditionallyRequred = schema.required.bind(this)();
      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
    }
    if (currentValue && schema.type instanceof Validator) {
      var typeError = schema.type.assert(currentValue);
      if (typeError) errors = errors.concat(typeError);
    } else if (currentValue && typeof schema.type === 'string' && Validator[schema.type]) {
       var typeError = Validator[schema.type]().assert(currentValue);
       if (typeError) errors = errors.concat(typeError);
    } else if (currentValue && typeof schema.type === 'function') {
      var typeError = schema.type.call(this, currentValue);
      if (typeError) errors.push(typeError);
    }

    return errors.length ? errors : false;
  },

  didSubmit: function (field) {
    if (!field) return this.state.__didSubmit;
    return this.state.__dirtyFields[field];
  },

  isGroupValid: function (groupName) {
    var isValid = true;
    var fields = Object.keys(this.__schema).filter(key => this.__schema[key].group === groupName);
    fields.forEach(key => {
      if (this.validateField(key)) isValid = false;
    });
    return isValid;
  },

  isValid: function () {
    var isValid = true;
    Object.keys(this.__schema).forEach(key => {
      if (this.validateField(key)) isValid = false;
    });
    return isValid;
  }
};
