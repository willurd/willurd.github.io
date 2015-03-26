var React = require('react');
var Router = require('react-router');
var App = require('view/app/App');

var { Route } = Router;

var router = Router.create({
  routes: (
    <Route handler={App} path='/'>
    </Route>
  )
});

module.exports = router;
