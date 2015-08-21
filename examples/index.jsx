var React = require('react/addons');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;
var Markdown = require('react-remarkable')

var InputTypes = require('./input-types.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <header>
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

var Home = React.createClass({
  render: function () {
    return (<div className="docs">
      <Markdown source={require('../README.md').split('## Guide and examples')[0]} />
    </div>);
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="simple" handler={require('./simple/docs.jsx')}/>
    <Route name="errors" handler={require('./errors/docs.jsx')}/>
    <Route name="linking" handler={require('./linking/docs.jsx')}/>
    <Route name="children" handler={require('./children/docs.jsx')}/>
    <Route name="schema" handler={require('./schema/docs.jsx')}/>
    <Route name="submitting" handler={require('./submitting/docs.jsx')}/>
    <Route name="inputTypes" handler={InputTypes}/>
    <Route name="multi" handler={require('./multi/docs.jsx')}/>
    <Route name="ab" handler={require('./ab/docs.jsx')}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
