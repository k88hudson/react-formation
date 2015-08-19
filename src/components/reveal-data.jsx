var React = require('react');
var RevealData = React.createClass({
  toString: function (val) {
    if (typeof val === 'function') {
      val = '[function]'
    }
    if (typeof val === 'boolean') {
      val = val ? 'true' : 'false';
    }
    return val;
  },
  renderList: function (obj) {
    var keys = Object.keys(obj);
    if (!keys.length) return '[Empty]';
    return <table>{keys.map(key => <tr><td>{key}</td><td>{this.toString(obj[key])}</td></tr>)}</table>;
  },
  render: function () {
    var props = this.props.props || {};
    var state = this.props.state || {};
    return (<div className="state">
      <div>
        <h3>{this.props.name}.props</h3>
        {this.renderList(props)}
      </div>
      <div>
        <h3>{this.props.name}.state</h3>
        {this.renderList(state)}
      </div>
    </div>);
  }
});
module.exports = RevealData;
