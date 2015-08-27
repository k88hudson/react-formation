var React = require('react/addons');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;
var {Markdown} = require('react-markdocs');

var InputTypes = require('./input-types.jsx');

var App = React.createClass({
  render: function () {
    return (<RouteHandler/>);
  }
});

var Examples = React.createClass({
  render: function () {
    return (
      <div className="container">
        <header className="links">
          <h2>Guide</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="simple">Simple form</Link></li>
            <li><Link to="children">Child components</Link></li>
            <li><Link to="linking">Linking field values</Link></li>
            <li><Link to="errors">Errors</Link></li>
            <li><Link to="submitting">Submitting</Link></li>
            <li><Link to="schema">Schema and validation</Link></li>
            <li><Link to="multi">Multi-part forms</Link></li>
            <li><Link to="ab">A/B testing</Link></li>
            <li><Link to="inputTypes">Input Types reference</Link></li>
          </ul>
        </header>
        <div className="body">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

function generateVariant(propsets) {
  var props = Object.keys(propsets);
  var variation = {};
  props.forEach(prop => {
    var variants = propsets[prop];
    variation[prop] = variants[Math.floor(Math.random() * (variants.length))];
  });
  return variation;
}


var Login = require('./login/index.jsx');
var variants = {
  showLabels: [true, false],
  signUpMessage: ['Sign up', 'Join', 'Join us', 'ONE OF US ONE OF US'],
  buttonColor: ['#00BE94', '#69A0FC']
};

var Home = React.createClass({

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
        <p>This login form was built in <a href="https://github.com/k88hudson/react-composable-form/blob/master/examples/login/index.jsx">under 100 lines of code</a> and includes:</p>
        <ul>
          <li>Advanced custom validations for each field</li>
          <li>Password strength testing</li>
          <li>Pre-submit validation</li>
          <li>Smart display of error messages</li>
          <li>Hooks for A/B testing variations (<a href="#" onClick={this.refreshTest}>try refreshing!</a>)</li>
        </ul>
      </footer>
    </div>);
  }
});

var ExamplesHome = React.createClass({
  render: function () {
    return (<div className="docs">
      <Markdown source={require('../README.md').split('## Guide and examples')[0]} />
    </div>);
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="examples" handler={Examples}>
      <Route name="simple" handler={require('./simple/docs.jsx')}/>
      <Route name="errors" handler={require('./errors/docs.jsx')}/>
      <Route name="linking" handler={require('./linking/docs.jsx')}/>
      <Route name="children" handler={require('./children/docs.jsx')}/>
      <Route name="schema" handler={require('./schema/docs.jsx')}/>
      <Route name="submitting" handler={require('./submitting/docs.jsx')}/>
      <Route name="inputTypes" handler={InputTypes}/>
      <Route name="multi" handler={require('./multi/docs.jsx')}/>
      <Route name="ab" handler={require('./ab/docs.jsx')}/>
      <Route name="airbnb" handler={require('./airbnb/index.jsx')}/>
      <DefaultRoute handler={ExamplesHome}/>
    </Route>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
