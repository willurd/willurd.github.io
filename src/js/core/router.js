import React from 'react';
import Router from 'react-router';
import App from 'view/app/App';
import NotFound from 'view/app/NotFound';
import Home from 'view/home/Home';

const { Route, DefaultRoute, NotFoundRoute } = Router;

const router = Router.create({
  routes: (
    <Route handler={App} name='root' path='/'>
      <DefaultRoute name='home' path='' handler={Home} />
      <Route name='resume' />
      <NotFoundRoute handler={NotFound} />
    </Route>
  )
});

export default router;
