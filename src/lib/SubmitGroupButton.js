var React = require('react');
var assign = require('react/lib/Object.assign');

module.exports = React.createClass({
  mixins: [require('./FormMixin')],
  onClick: function (e) {
    e.preventDefault();
    this.submitGroup(this.props.group, this.props.onSuccess, this.props.onError);
  },
  render: function () {
    var props = assign({}, this.props, {
      onClick: this.onClick
    });

    delete props.onSuccess;
    delete props.onError;

    return React.createElement('button', props, this.props.children || 'Submit');
  }
});
