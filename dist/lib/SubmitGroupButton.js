'use strict';

var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [require('./FormMixin')],
  onClick: function onClick(e) {
    e.preventDefault();
    this.submitGroup(this.props.group, this.props.onSuccess, this.props.onError);
  },
  render: function render() {
    var props = assign({}, this.props, {
      onClick: this.onClick
    });

    delete props.onSuccess;
    delete props.onError;

    return React.createElement('button', props, this.props.children || 'Submit');
  }
});