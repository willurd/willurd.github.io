var React = require('react');
var Router = require('react-router');
var App = require('component/app/App');
var Home = require('component/home/Home');

var { Route } = Router;

var router = Router.create({
  routes: (
    <Route handler={App} path='/'>
    </Route>
  )
});

module.exports = router;
