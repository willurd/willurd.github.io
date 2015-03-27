import React from 'react';
import analytics from 'ga-react-router';
import router from 'core/router';
import bootstrapService from 'service/bootstrap';
import { Logger } from 'lib/log';

const log = Logger.get('core/app');

bootstrapService.run().then(() => {
  router.run((Handler, state) => {
    analytics(state);

    try {
      React.render(<Handler />, document.body);
    } catch(e) {
      log.error('Error performing initial render:', e.stack || e);
    }
  });
}).catch(e => {
  log.error('Error bootstrapping application:', e.stack || e);
});
