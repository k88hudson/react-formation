var React = require('react/addons');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;

var Simple = require('./simple.jsx');
var Multi = require('./multi.jsx');
var InputTypes = require('./input-types.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <header>
          <h2>Examples:</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="simple">Simple form</Link></li>
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
      Welcome!
    </div>);
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="simple" handler={Simple}/>
    <Route name="inputTypes" handler={InputTypes}/>
    <Route name="multi" handler={Multi}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
