import React from 'react';
import router from 'core/router';
import bootstrapService from 'service/bootstrap';
import { Logger } from 'lib/log';
import analytics from 'lib/analytics';

const log = Logger.get('core/app');

bootstrapService.run().then(() => {
  router.run((Handler, state) => {
    let routes = (state.routes || []).map(route => route.name).slice(1);

    analytics.page('Home', {
      action: state.action,
      params: state.params,
      path: state.path,
      pathname: state.pathname,
      query: state.query,
      routes: routes,
      routePath: routes.join('/')
    });

    try {
      React.render(<Handler />, document.getElementById('app'));
    } catch(e) {
      log.error('Error performing initial render:', e.stack || e);
    }
  });
}).catch(e => {
  log.error('Error bootstrapping application:', e.stack || e);
});
