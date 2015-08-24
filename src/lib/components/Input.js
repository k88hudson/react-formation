var React = require('react');
var assign = require('react/lib/Object.assign');
var ComposableForm = require('../../form');
var ErrorMessage = ComposableForm.ErrorMessage;

var Input = React.createClass({
  mixins: [ComposableForm.FormMixin],
  getDefaultProps: function () {
    return {
      type: 'text',
      validateOnBlur: false
    };
  },
  getInitialState: function () {
    return {
      didBlur: false
    };
  },
  onBlur: function () {
    this.setState({didBlur: true});
  },
  render: function () {
    var containerProps = {
      className: 'input-group'
    };

    var inputProps = {
      type: this.props.type,
      valueLink: this.linkField(this.props.field),
      onBlur: this.onBlur
    };

    var errorMessageProps = {
      field: this.props.field
    };

    if (this.props.validateOnBlur) {
      errorMessageProps.show = this.state.didBlur;
    }

    return React.createElement('div', containerProps,
      React.createElement('label', {}, this.props.label),
      React.createElement('input', inputProps),
      React.createElement(ErrorMessage, errorMessageProps)
    );
  }
});

module.exports = Input;
