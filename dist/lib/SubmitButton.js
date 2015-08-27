'use strict';

var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [require('./FormMixin')],
  render: function render() {
    var props = assign({}, this.props, {
      onClick: this.submitForm
    });
    return React.createElement('button', props, this.props.children || 'Submit');
  }
});