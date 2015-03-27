import React from 'react';
import Router from 'react-router';
import App from 'view/app/App';
import Home from 'view/home/Home';

const { Route, DefaultRoute } = Router;

const router = Router.create({
  routes: (
    <Route handler={App} path='/'>
      <DefaultRoute name='home' path='' handler={Home} />
      <Route name='resume' />
    </Route>
  )
});

export default router;
