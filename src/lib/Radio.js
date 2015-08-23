var React = require('react');
var assign = require('react/lib/Object.assign');

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
    return React.createElement('input', props);
  }
});

module.exports = Radio;
