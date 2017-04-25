import React from 'react';
import router from 'core/router';
import bootstrapService from 'service/bootstrap';
import { Logger } from 'lib/log';

bootstrapService.run().then(() => {
  router.run((Handler, state) => {
    let routes = (state.routes || []).map(route => route.name).slice(1);
    let pageName = routes.join('/').trim();

    try {
      React.render(<Handler />, document.getElementById('app'));
    } catch(e) {
      window.onerror('Error rendering application: ' + e.stack || (e && e.toString() || e));
    }
  });
}).catch(e => {
  window.onerror('Error bootstrapping application: ' + e.stack || (e && e.toString() || e));
});
