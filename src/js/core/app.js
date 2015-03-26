var React = require('react');
var router = require('core/router');
var { Logger } = require('lib/log');
var bootstrapService = require('service/bootstrap');

var log = Logger.get('core/app');

// Load polyfills.
require('es6-shim');
require("babelify/polyfill");

bootstrapService.run().then(() => {
  router.run((Handler) => {
    try {
      React.render(<Handler />, document.body);
    } catch(e) {
      log.error('Error performing initial render:', e.stack || e);
    }
  });
}).catch(e => {
  log.error('Error bootstrapping application:', e.stack || e);
});
