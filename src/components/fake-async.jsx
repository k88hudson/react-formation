var React = require('react');
var RevealData = require('./reveal-data.jsx');

var FakeAsync = React.createClass({
  getInitialState: function () {
    return {
      loading: false
    };
  },
  update: function () {
    this.props.setParentState({loading: true});
    setTimeout(() => {
      this.props.setParentState({loading: false});
    }, 4000);
  },
  render: function () {
    return (<div>

      <button onClick={this.update}>{this.props.loading ? 'Loading...' : 'Update some fake data'}</button>

      <RevealData name="FakeAsync" props={this.props} state={this.state} />

    </div>);
  }
});

module.exports = FakeAsync;
