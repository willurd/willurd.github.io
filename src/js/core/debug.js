var alt = require('core/alt');
var config = require('core/config');
var { Logger } = require('lib/log');

var actionLog = Logger.get('alt/action');
var actionLogMethod = actionLog.debug.bind(actionLog);

var debug = {
  init() {
    this.setupActions();
    this.setupGlobals();
  },

  setupActions() {
    if (!config.debug.actions) {
      return;
    }

    alt.dispatcher.register(actionLogMethod);
  },

  setupGlobals() {
    if (config.debug.globals) {
      return;
    }

    Object.assign(window, {
      action: {
      },

      core: {
        alt: require('core/alt'),
        config: require('core/config'),
        router: require('core/router'),
        title: require('core/title'),
        types: require('core/types')
      },

      lib: {
        http: require('lib/http')
      },

      model: {
      },

      service: {
      },

      store: {
      }
    });
  }
};

module.exports = debug;
