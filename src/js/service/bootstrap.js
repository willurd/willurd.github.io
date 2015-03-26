var Q = require('q');
var debug = require('core/debug');

var bootstrapService = {
  run() {
    debug.init();

    // TODO: Load initial data here.
    return Promise.resolve();
  }
};

module.exports = bootstrapService;
