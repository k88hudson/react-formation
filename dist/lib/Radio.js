'use strict';

var React = require('react');
var assign = require('react/lib/Object.assign');

var Radio = React.createClass({
  displayName: 'Radio',

  onChange: function onChange(e) {
    var value = e.target.value;
    if (typeof this.props.value === 'number') value = +value;
    this.props.radioLink.requestChange(value);
  },
  render: function render() {
    var props = assign({}, this.props, {
      validations: 'radio',
      checked: this.props.value + '' === this.props.radioLink.value + '',
      onChange: this.onChange
    });
    return React.createElement('input', props);
  }
});

module.exports = Radio;