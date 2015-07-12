'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Login = require('./components/Login');
var Chat = require('./components/Chat');




var Main = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
<Route handler={Main} path="/">
  <Route name="login" path="/login" handler={Login}/>
  <Route name="chat" path="/chat" handler={Chat} />
  <DefaultRoute handler={Login}/>
  <Router.NotFoundRoute handler={Login}/>
</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});