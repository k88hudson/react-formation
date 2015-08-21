var React = require('react/addons');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;

var Multi = require('./multi.jsx');
var InputTypes = require('./input-types.jsx');

var Markdown = require('react-remarkable');
var readme = require('../README.md');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <header>
          <h2>Examples:</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="simple">Simple form</Link></li>
            <li><Link to="errors">Displaying Errors</Link></li>
            <li><Link to="children">Child components</Link></li>
            <li><Link to="inputTypes">Input Types</Link></li>
            <li><Link to="multi">Multi-part form</Link></li>
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
    return (<div>
      <Markdown source={readme} />
    </div>);
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="simple" handler={require('./simple/docs.jsx')}/>
    <Route name="errors" handler={require('./errors/docs.jsx')}/>
    <Route name="children" handler={require('./children/docs.jsx')}/>
    <Route name="inputTypes" handler={InputTypes}/>
    <Route name="multi" handler={Multi}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
