'use strict';

var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    field: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool
  },
  mixins: [require('./FormMixin')],
  showErrors: function showErrors(errors) {
    if (!errors) return false;
    if (typeof this.props.show !== 'undefined') return this.props.show;
    if (errors && this.didSubmit(this.props.field)) return true;
  },
  render: function render() {
    var errors = this.validateField(this.props.field);
    var props = assign({ className: 'errors' }, this.props, {
      hidden: !this.showErrors(errors)
    });
    return React.createElement('div', props, errors && errors.map(function (error) {
      return React.createElement('span', { key: error }, error);
    }));
  }
});