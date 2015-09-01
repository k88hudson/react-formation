var React = require('react/addons');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;
var {Markdown} = require('react-markdocs');
var IntlMixin = require('react-intl').IntlMixin;

var routeDefinitions = [
  <DefaultRoute name="simple" label="Get started" handler={require('./pages/simple/docs.jsx')} />,
  <Route name="linking" label="Adding inputs" handler={require('./pages/linking/docs.jsx')} />,
  <Route name="children" label="Building modular UI" handler={require('./pages/children/docs.jsx')} />,
  <Route name="validations" label="Validation" handler={require('./pages/validations/docs.jsx')} />,
  <Route name="errors" label="Errors" handler={require('./pages/errors/docs.jsx')} />,
  <Route name="submitting" label="Submitting" handler={require('./pages/submitting/docs.jsx')} />,
  <Route name="schema" label="Schema" handler={require('./pages/schema/docs.jsx')} />,
  <Route name="multi" label="Multi-part forms" handler={require('./pages/multi/docs.jsx')} />,
  <Route name="ab" label="A/B testing" handler={require('./pages/ab/docs.jsx')} />,
  <Route name="inputTypes" label="Input types reference" handler={require('./pages/inputTypes/docs.jsx')} />,
  <Route name="airbnb" label="Example: airbnb" handler={require('./pages/airbnb/docs.jsx')} />
];

var intlData = {
  locales : ['en-US'],
  messages: {
    birthday: 'Birthday',
    foo: 'foo'
  }
};

var App = React.createClass({
  mixins: [IntlMixin],
  render: function () {
    return (<RouteHandler />);
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
            {routeDefinitions.map(route => <li><Link to={route.props.name}>{route.props.label}</Link></li>)}
          </ul>
        </header>
        <div className="body">
          <RouteHandler/>
        </div>
      </div>
    );
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
      {routeDefinitions}
    </Route>
    <DefaultRoute handler={require('./home.jsx')}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler {...intlData} />, document.getElementById('app'));
});
