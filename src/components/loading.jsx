var React = require('react');
var RevealData = require('./reveal-data.jsx');

var Loading = React.createClass({
  getDefaultProps: function () {
    return {
      loading: false
    };
  },
  render: function () {
    return (<div>

      <p>Status: <span hidden={!this.props.loading}>Loading...</span></p>

      <RevealData name="Loading" props={this.props} state={this.state} />

    </div>);
  }
});

module.exports = Loading;
