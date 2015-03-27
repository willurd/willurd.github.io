import config from 'core/config';

const loggers = {};
const logFunctions = ['debug', 'error', 'info', 'log', 'warn'];

class Logger {
  static get(name) {
    if (!(name in loggers)) {
      loggers[name] = new Logger(name);
    }

    return loggers[name];
  }

  constructor(name) {
    this.name = name;

    logFunctions.forEach(fn => this[fn] = this.logger.bind(this, fn));
  }

  logger(type, ...args) {
    if (!config.debug.logging) {
      return;
    }

    console[type](...[`%c[${this.name}]`, 'color: #777'].concat(args));
  }
}

const log = Logger.get('log');

log.Logger = Logger;

export default log;
