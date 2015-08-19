var React = require('react');
var RevealData = require('./reveal-data.jsx');

var Editor = React.createClass({
  getInitialState: function () {
    return {
      bio: this.props.bio
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      bio: nextProps.bio
    });
  },
  onChange: function (e) {
    this.setState({
      bio: e.target.value
    });
  },
  save: function () {
    this.props.setParentState({
      bio: this.state.bio
    });
  },
  render: function () {
    return (<div>
      <textarea value={this.state.bio} onChange={this.onChange} />
      <p><button onClick={this.save}>Save</button></p>

      <RevealData name="Editor" props={this.props} state={this.state} />
    </div>);
  }
});
module.exports = Editor;
