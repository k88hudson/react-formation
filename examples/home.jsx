var React = require('react/addons');
var Login = require('./pages/login/index.jsx');
var {Link} = require('react-router');

function generateVariant(propsets) {
  var props = Object.keys(propsets);
  var variation = {};
  props.forEach(prop => {
    var variants = propsets[prop];
    variation[prop] = variants[Math.floor(Math.random() * (variants.length))];
  });
  return variation;
}

var variants = {
  showLabels: [true, false],
  signUpMessage: ['Sign up', 'Join', 'Join us', 'One. Of. Us.'],
  buttonColor: ['#00BE94', '#69A0FC']
};

var GithubLink = React.createClass({
  render: function () {
    return (<iframe
      className="gh-star" src="https://ghbtns.com/github-btn.html?user=k88hudson&repo=react-formation&type=star&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="160px"
      height="30px"></iframe>);
  }
});

module.exports = React.createClass({

  getInitialState: function () {
    return {
      variants: generateVariant(variants)
    };
  },

  refreshTest: function (e) {
    e.preventDefault();
    this.setState({variants: generateVariant(variants)});
  },

  render: function () {

    return (<div className="home">
      <header>
        <h1>Build robust, testable forms in minutes<br/>with <strong>React Formation</strong></h1>
        <p><Link to="examples">See the guide</Link></p>
      </header>

      <Login {...this.state.variants} />
      <footer>
        <p>This login form was built in <a href="https://github.com/k88hudson/react-formation/blob/master/examples/login/index.jsx">under 100 lines of code</a> and includes:</p>
        <ul>
          <li>Advanced custom validations for each field</li>
          <li>Password strength testing</li>
          <li>Pre-submit validation</li>
          <li>Smart display of error messages</li>
          <li>Hooks for A/B testing variations (<a href="#" onClick={this.refreshTest}>try refreshing!</a>)</li>
        </ul>
        <p><GithubLink /></p>
      </footer>
    </div>);
  }
});
