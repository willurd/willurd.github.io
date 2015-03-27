import alt from 'core/alt';
import config from 'core/config';
import { Logger } from 'lib/log';

const debug = {
  init() {
    this.setupActions();
    this.setupGlobals();
  },

  setupActions() {
    if (!config.debug.actions) {
      return;
    }

    let actionLog = Logger.get('alt/action');
    let actionLogMethod = actionLog.debug.bind(actionLog);

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

export default debug;
