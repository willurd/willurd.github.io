var React = require('react');
var Router = require('react-router');
var App = require('view/app/App');

var { Route, DefaultRoute } = Router;

var router = Router.create({
  routes: (
    <Route handler={App} path='/'>
      <DefaultRoute name='home' path='' />
      <Route name='resume' />
    </Route>
  )
});

module.exports = router;
