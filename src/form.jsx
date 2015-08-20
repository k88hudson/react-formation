var React = require('react/addons');
var assign = require('react/lib/Object.assign');

var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var NUMBER_REGEX = /^\d+$/;

var contextTypes = {
  isValid: React.PropTypes.bool,
  didSubmit: React.PropTypes.func,
  submitForm: React.PropTypes.func,
  linkField: React.PropTypes.func,
  validateField: React.PropTypes.func,
  isGroupValid: React.PropTypes.func,
  submitGroup: React.PropTypes.func
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
    return this.context.isValid.apply(null, arguments);
  },
  didSubmit: function () {
    return this.context.didSubmit.apply(null, arguments);
  },
  submitForm: function (e) {
    if (e) e.preventDefault();
    this.context.submitForm();
  },
  linkField: function () {
    return this.context.linkField.apply(null, arguments);
  },
  validateField: function () {
    return this.context.validateField.apply(null, arguments);
  },
  isGroupValid: function () {
    return this.context.isGroupValid.apply(null, arguments);
  },
  submitGroup: function () {
    return this.context.submitGroup.apply(null, arguments);
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

var SubmitGroupButton = React.createClass({
  mixins: [FormMixin],
  onClick: function (e) {
    e.preventDefault();
    this.submitGroup(this.props.group, this.props.onSuccess, this.props.onError);
  },
  render: function () {
    return (<button onClick={this.onClick}>
      {this.props.children || 'Submit'}
    </button>);
  }
});

var ErrorMessage = React.createClass({
  mixins: [FormMixin],
  showErrors: function (errors) {
    if (!errors) return false;
    if (typeof this.props.show !== 'undefined') return this.props.show;
    if (errors && this.didSubmit(this.props.field)) return true;
  },
  render: function () {
    var errors = this.validateField(this.props.field);
    return (<div className="errors" hidden={!this.showErrors(errors)}>
      {errors && errors.map(error => <span key={error}>{error}</span>)}
    </div>);
  }
});

var MultiForm = React.createClass({
  getInitialState: function () {
    return {};
  },
  render: function () {
    return (<div>
      {this.props.children}
    </div>);
  }
});

module.exports = {
  CreateForm: function CreateForm(config) {
    if (!config.schema) throw new Error('You must include "schema" as one of the properties for CreateForm');
    if (!config.mixins) config.mixins = [];

    if (config.schema instanceof Array) {
      var flatSchema = {};
      config.schema.forEach((group, i) => {
        Object.keys(group).forEach(key => {
          group[key].group = i;
          flatSchema[key] = group[key];
        });
      });
      config.schema = flatSchema;
    }

    // Todo don't dupe
    config.mixins.push(React.addons.LinkedStateMixin);
    config.mixins.push({

      getInitialState: function () {

        var state = {
          isValid: false,
          didSubmit: false,
          dirtyFields: []
        };

        Object.keys(this.schema).forEach(key => {
          state[key] = this.schema[key].initial;
        });

        return state;
      },

      values: function () {
        var values = {};
        Object.keys(this.schema).forEach(key => {
          values[key] = this.linkField(key).value;
        });
        return values;
      },

      didSubmit: function (field) {
        if (!field) return this.state.didSubmit;
        return this.state.dirtyFields.indexOf(field) !== -1;
      },

      submitGroup: function (group, onSuccess, onError) {

        var dirtyFields = this.state.dirtyFields;

        Object.keys(this.schema).forEach(key => {
          if (this.schema[key].group === group && dirtyFields.indexOf(key) === -1) dirtyFields.push(key);
        });

        this.setState({dirtyFields});

        // TODO return values
        if (this.isGroupValid(group)) {
          onSuccess && onSuccess();
        } else {
          onError && onError();
        }
      },

      submitForm: function() {
        // Make all fields dirty
        var dirtyFields = this.state.dirtyFields;
        Object.keys(this.schema).forEach(key => {
          if (dirtyFields.indexOf(key) === -1) dirtyFields.push(key);
        });

        this.setState({
          dirtyFields,
          didSubmit: true
        });

        if (!this.isValid()) return;

        var data = {};

        Object.keys(this.schema).forEach(key => {
          if (typeof this.state[key] !== 'undefined') data[key] = this.state[key];
        });

        if (this.onSuccess) {
          this.onSuccess(data);
        }
      },

      linkField: function (key) {
        if (!this.schema[key]) throw new Error('No value "' + key + '" exists in the schema');
        return this.linkState(key);
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

      // TODO: rename to isGroupValid
      isGroupValid: function (groupName) {
        var isValid = true;
        var fields = Object.keys(this.schema).filter(key => this.schema[key].group === groupName);
        fields.forEach(key => {
          if (this.validateField(key)) isValid = false;
        });
        return isValid;
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
          validateField: this.validateField,
          isGroupValid: this.isGroupValid,
          submitGroup: this.submitGroup
        }
      }
    });

    return React.createClass(config);
  },
  SubmitButton,
  SubmitGroupButton,
  FormMixin,
  ErrorMessage,
  Radio,
  MultiForm
};
