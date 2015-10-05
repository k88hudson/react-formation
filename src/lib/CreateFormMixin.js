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

    // Clear all global errors
    this.setState({__globalErrors: {}});

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
    var validator = schema.validations;
    var globalErrors = this.getGlobalErrors()[key];

    if (schema.type) {
      console.warn('Using "type" in your schema is deprecated. Please use "validations" instead.');
      validator = schema.type;
    }

    // Required field
    if (schema.required === true && !currentValue) errors.push(label + ' is required');
    if (typeof schema.required === 'function') {
      var isConditionallyRequred = schema.required.bind(this)();
      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
    }

    // Test validations
    var typeError;
    if (currentValue && validator instanceof Validator) {
      typeError = validator.assert(currentValue);
    } else if (currentValue && typeof validator === 'string' && Validator[validator]) {
      typeError = Validator[validator]().assert(currentValue);
    } else if (currentValue && typeof validator === 'function') {
      typeError = validator.call(this, currentValue);
    }

    if (typeError && typeError.length) errors = errors.concat(typeError);

    // Global errors
    if (globalErrors) errors = errors.concat(globalErrors);

    return errors.length ? errors : true;
  },

  setGlobalError: function (field, error) {
    var globalErrors = this.state.__globalErrors;

    if (error && typeof error !== 'string' && !(error instanceof Array)) {
      throw new Error('Second argument must be a string on an array of strings');
    }

    if (!error) {
      delete globalErrors[field];
      this.setState({__globalErrors: globalErrors});
    } else {
      if (typeof error === 'string') error = [error];
      globalErrors[field] = error;
      this.setState({__globalErrors: globalErrors});
    }
  },

  getGlobalErrors: function () {
    return this.state.__globalErrors;
  },

  didSubmit: function (field) {
    if (!field) return this.state.__didSubmit;
    return this.state.__dirtyFields[field];
  },

  isGroupValid: function (groupName) {
    var isValid = true;
    var fields = Object.keys(this.__schema).filter(key => this.__schema[key].group === groupName);
    fields.forEach(key => {
      if (this.validateField(key) !== true) isValid = false;
    });
    return isValid;
  },

  isValid: function () {
    var isValid = true;
    Object.keys(this.__schema).forEach(key => {
      if (this.validateField(key) !== true ) isValid = false;
    });
    return isValid;
  }
};
