var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = React.createClass({
  mixins: [require('./FormMixin')],
  render: function () {
    var props = assign({}, this.props, {
      onClick: this.submitForm
    });
    return (<button {...props}>
      {this.props.children || 'Submit'}
    </button>);
  }
});
