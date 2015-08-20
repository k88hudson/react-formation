var React = require('react/addons');
var assign = require('react/lib/Object.assign');

var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var NUMBER_REGEX = /^\d+$/;

var contextTypes = {
  isValid: React.PropTypes.bool,
  didSubmit: React.PropTypes.func,
  submitForm: React.PropTypes.func,
  linkField: React.PropTypes.func,
  validateField: React.PropTypes.func
};

var Radio = React.createClass({
  onChange: function (e) {
    var value = e.target.value;
    if (typeof this.props.value === 'number') value = +value;
    this.props.radioLink.requestChange(value);
  },
  render: function () {
    var props = assign({}, this.props, {
      type: 'radio',
      checked: this.props.value + '' === this.props.radioLink.value + '',
      onChange: this.onChange
    });
    return <input {...props} />;
  }
});


var FormMixin = {
  contextTypes,
  isValid: function () {
    return this.context.isValid;
  },
  didSubmit: function () {
    return this.context.didSubmit();
  },
  submitForm: function (e) {
    if (e) e.preventDefault();
    this.context.submitForm();
  },
  linkField: function (field) {
    return this.context.linkField(field);
  },
  validateField: function (field) {
    return this.context.validateField(field);
  }
};

var SubmitButton = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<button onClick={this.submitForm}>
      {this.props.children || 'Submit'}
    </button>);
  }
});

var ErrorMessage = React.createClass({
  mixins: [FormMixin],
  render: function () {
    var errors = this.validateField(this.props.field);
    return (<div className="errors" hidden={!errors || this.props.hidden}>
      {errors && errors.map(error => <span key={error}>{error}</span>)}
    </div>);
  }
});

module.exports = {
  CreateForm: function CreateForm(config) {
    if (!config.schema) throw new Error('You must include "schema" as one of the properties for CreateForm');
    if (!config.mixins) config.mixins = [];

    // Todo don't dupe
    config.mixins.push(React.addons.LinkedStateMixin);
    config.mixins.push({

      getInitialState: function () {

        var state = {
          isValid: false,
          didSubmit: false
        };

        Object.keys(this.schema).forEach(key => {
          state[key] = this.schema[key].initial;
        });

        return state;
      },

      didSubmit: function () {
        return this.state.didSubmit;
      },

      submitForm: function() {

        this.setState({
          didSubmit: true
        });

        if (!this.isValid()) return;

        var data = {};

        Object.keys(this.schema).forEach(key => {
          data[key] = this.state[key];
        });

        if (this.onSuccess) {
          this.onSuccess(data);
        }
      },

      linkField: function (key) {
        if (!this.schema[key]) throw new Error('No value "' + key + '" exists in the schema');
        var link = this.linkState(key);
        return link;
      },

      validations: {
        email: function (value) {
          if (!EMAIL_REGEX.test(value)) {
            return ' must be an email';
          }
        },
        number: function (value) {
          if (!NUMBER_REGEX.test(value)) {
            return ' must be a number';
          }
        }
      },

      validateField: function (key) {
        var errors = [];
        var schema = this.schema[key];
        var currentValue = this.state[key];
        var label = schema.label || key;

        if (schema.required === true && !currentValue) errors.push(label + ' is required');
        if (typeof schema.required === 'function') {
          var isConditionallyRequred = schema.required.bind(this)();
          if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
        }
        if (currentValue && schema.type && this.validations[schema.type]) {
          var typeError = this.validations[schema.type](currentValue);
          if (typeError) errors.push(label + typeError);
        }
        if (!errors.length) return false;
        return errors;
      },

      isValid: function () {
        var isValid = true;
        Object.keys(this.schema).forEach(key => {
          if (this.validateField(key)) isValid = false;
        });
        return isValid;
      },

      childContextTypes: contextTypes,

      getChildContext: function() {
        return {
          isValid: this.state.isValid,
          didSubmit: this.didSubmit,
          submitForm: this.submitForm,
          linkField: this.linkField,
          validateField: this.validateField
        }
      }
    });

    return React.createClass(config);
  },
  SubmitButton,
  FormMixin,
  ErrorMessage,
  Radio
};
