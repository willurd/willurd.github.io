import config from 'core/config';
import { Logger } from 'lib/log';

const log = Logger.get('analytics');
const debugAnalytics = {};
const methods = window.analytics.methods || [
  'trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify',
  'group', 'track', 'ready', 'alias', 'page', 'once', 'off', 'on'
];

methods.forEach(method => {
  debugAnalytics[method] = log.debug.bind(log, method);
});

const fns = {
  development: debugAnalytics,
  production: window.analytics
};

const analytics = fns[config.env];

export default analytics;
