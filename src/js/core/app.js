var React = require('react');
var analytics = require('ga-react-router');
var router = require('core/router');
var { Logger } = require('lib/log');
var bootstrapService = require('service/bootstrap');

var log = Logger.get('core/app');

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
