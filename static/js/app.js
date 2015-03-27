(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
"use strict";

var Alt = require("alt");

module.exports = window.alt = new Alt();


},{"alt":"alt"}],5:[function(require,module,exports){
"use strict";

var React = require("react");
var analytics = require("ga-react-router");
var router = require('./router.js');

var _require = require('./../lib/log.js');

var Logger = _require.Logger;

var bootstrapService = require('./../service/bootstrap.js');

var log = Logger.get("core/app");

bootstrapService.run().then(function () {
  router.run(function (Handler, state) {
    analytics(state);

    try {
      React.render(React.createElement(Handler, null), document.body);
    } catch (e) {
      log.error("Error performing initial render:", e.stack || e);
    }
  });
})["catch"](function (e) {
  log.error("Error bootstrapping application:", e.stack || e);
});


},{"./../lib/log.js":14,"./../service/bootstrap.js":17,"./router.js":9,"ga-react-router":"ga-react-router","react":"react"}],6:[function(require,module,exports){
"use strict";

var config = {
  debug: {
    actions: true,
    globals: true,
    logging: true
  }
};

module.exports = config;


},{}],7:[function(require,module,exports){
"use strict";

var alt = require('./alt.js');
var config = require('./config.js');

var _require = require('./../lib/log.js');

var Logger = _require.Logger;

var actionLog = Logger.get("alt/action");
var actionLogMethod = actionLog.debug.bind(actionLog);

var debug = {
  init: function init() {
    this.setupActions();
    this.setupGlobals();
  },

  setupActions: function setupActions() {
    if (!config.debug.actions) {
      return;
    }

    alt.dispatcher.register(actionLogMethod);
  },

  setupGlobals: function setupGlobals() {
    if (config.debug.globals) {
      return;
    }

    Object.assign(window, {
      action: {},

      core: {
        alt: require('./alt.js'),
        config: require('./config.js'),
        router: require('./router.js'),
        title: require('./title.js'),
        types: require('./types.js')
      },

      lib: {
        http: require('./../lib/http.js')
      },

      model: {},

      service: {},

      store: {}
    });
  }
};

module.exports = debug;


},{"./../lib/http.js":13,"./../lib/log.js":14,"./alt.js":4,"./config.js":6,"./router.js":9,"./title.js":10,"./types.js":11}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var path = _interopRequire(require("path"));

function resource() {
  for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return path.join.apply(path, ["static"].concat(parts));
}

resource.img = function () {
  for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return resource.apply(undefined, ["img"].concat(parts));
};

module.exports = resource;


},{"path":2}],9:[function(require,module,exports){
"use strict";

var React = require("react");
var Router = require("react-router");
var App = require('./../view/app/App.js');

var Route = Router.Route;

var router = Router.create({
  routes: React.createElement(Route, { handler: App, path: "/" })
});

module.exports = router;


},{"./../view/app/App.js":18,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
"use strict";

var stack = [];

function renderTitle() {
  document.title = stack.reverse().join(" | ");
}

var title = {
  push: function push(value) {
    stack.push(value);
    renderTitle();
  },

  swap: function swap(value) {
    stack[stack.length - 1] = value;
    renderTitle();
  },

  pop: function pop() {
    stack.pop();
  }
};

module.exports = title;


},{}],11:[function(require,module,exports){
"use strict";

var types = {};

module.exports = types;


},{}],12:[function(require,module,exports){
"use strict";

exports.flatten = flatten;
exports.flatMap = flatMap;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var flattener = function (acc, subList) {
  return acc.concat(subList);
};

function flatten(list) {
  return list.reduce(flattener, []);
}

function flatMap(list, fn) {
  return flatten(list.map(fn));
}


},{}],13:[function(require,module,exports){
"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var request = require("superagent");

var _require = require('./log.js');

var Logger = _require.Logger;

var log = Logger.get("core/http");

var httpMethods = ["get", "post"];
var dataTypes = ["text", "json"];
var dataTypeConverters = {
  text: function (text) {
    return text;
  },
  json: function (text) {
    return JSON.parse(text);
  }
};

function promisedRequest(httpMethod, url, data, dataType) {
  return new Promise(function (resolve, reject) {
    log.debug("Making " + httpMethod + " request to " + url);

    request[httpMethod](url, data, function (res) {
      if (res.ok) {
        resolve(dataTypeConverters[dataType](res.text));
      } else {
        reject(res.error);
      }
    });
  });
}

var http = {
  get: function get(url, dataType) {
    return promisedRequest("get", url, {}, dataType);
  },

  post: function post(url, data, dataType) {
    return promisedRequest("post", url, data, dataType);
  }
};

dataTypes.forEach(function (dataType) {
  httpMethods.forEach(function (httpMethod) {
    http[httpMethod][dataType] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return http[httpMethod].apply(http, _toConsumableArray(args.concat([dataType])));
    };
  });
});

module.exports = http;


},{"./log.js":14,"superagent":"superagent"}],14:[function(require,module,exports){
"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var config = require('./../core/config.js');

var loggers = {};
var logFunctions = ["debug", "error", "info", "log", "warn"];

var Logger = (function () {
  function Logger(name) {
    var _this = this;

    _classCallCheck(this, Logger);

    this.name = name;

    logFunctions.forEach(function (fn) {
      return _this[fn] = _this.logger.bind(_this, fn);
    });
  }

  _createClass(Logger, {
    logger: {
      value: function logger(type) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!config.debug.logging) {
          return;
        }

        console[type].apply(console, _toConsumableArray(["%c[" + this.name + "]", "color: #777"].concat(args)));
      }
    }
  }, {
    get: {
      value: function get(name) {
        if (!(name in loggers)) {
          loggers[name] = new Logger(name);
        }

        return loggers[name];
      }
    }
  });

  return Logger;
})();

var log = Logger.get("log");
log.Logger = Logger;

module.exports = log;


},{"./../core/config.js":6}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventEmitter = require("events").EventEmitter;

var Screen = (function (_EventEmitter) {
  function Screen() {
    var _this = this;

    _classCallCheck(this, Screen);

    window.addEventListener("resize", function () {
      _this.emit("resize", _this.size());
    });
  }

  _inherits(Screen, _EventEmitter);

  _createClass(Screen, {
    size: {
      value: function size() {
        return {
          height: this.height(),
          width: this.width()
        };
      }
    },
    height: {
      value: function height() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }
    },
    width: {
      value: function width() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
    }
  });

  return Screen;
})(EventEmitter);

module.exports = new Screen();


},{"events":1}],16:[function(require,module,exports){
"use strict";

var title = require('./../core/title.js');

var titleMixin = {
  title: (function (_title) {
    var _titleWrapper = function title(_x) {
      return _title.apply(this, arguments);
    };

    _titleWrapper.toString = function () {
      return _title.toString();
    };

    return _titleWrapper;
  })(function (value) {
    if (this.titleSet) {
      title.swap(value);
    } else {
      title.push(value);
    }

    this.titleSet = true;
  }),

  componentWillUnmount: function componentWillUnmount() {
    if (this.titleSet) {
      title.pop();
    }
  }
};

module.exports = titleMixin;


},{"./../core/title.js":10}],17:[function(require,module,exports){
"use strict";

var Q = require("q");
var debug = require('./../core/debug.js');

var bootstrapService = {
  run: function run() {
    debug.init();

    // TODO: Load initial data here.
    return Promise.resolve();
  }
};

module.exports = bootstrapService;


},{"./../core/debug.js":7,"q":"q"}],18:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var config = _interopRequire(require('./../../core/config.js'));

var titleMixin = _interopRequire(require('./../../mixin/title.js'));

var RouteHandler = require("react-router").RouteHandler;

var Header = _interopRequire(require('./Header.js'));

var Stripes = _interopRequire(require('./Stripes.js'));

var AppContainer = React.createClass({
  displayName: "AppContainer",

  render: function render() {
    return React.createElement(
      "div",
      { className: "AppContainer" },
      React.createElement(Stripes, { position: "left" }),
      React.createElement(Stripes, { position: "right" }),
      React.createElement(App, null)
    );
  }
});

var App = React.createClass({
  displayName: "App",

  mixins: [titleMixin],

  componentDidMount: function componentDidMount() {
    this.title("William Bowers");
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(Header, null),
      React.createElement(RouteHandler, null)
    );
  }
});

module.exports = AppContainer;


},{"./../../core/config.js":6,"./../../mixin/title.js":16,"./Header.js":19,"./Stripes.js":20,"react":"react","react-router":"react-router"}],19:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var resource = _interopRequire(require('./../../core/resource.js'));

var Photo = React.createClass({
  displayName: "Photo",

  render: function render() {
    return React.createElement(
      "div",
      { className: "Photo" },
      React.createElement("img", { src: resource.img("me.jpg") })
    );
  }
});

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    var whatami = ["Software Engineer", "Lifelong learner", "Advocate for users"];

    return React.createElement(
      "div",
      { className: "Header" },
      React.createElement(Photo, null),
      React.createElement(
        "h1",
        null,
        "WILLIAM BOWERS"
      ),
      React.createElement(
        "p",
        null,
        whatami.join(" · ")
      ),
      React.createElement(
        "p",
        { className: "email" },
        React.createElement(
          "em",
          null,
          "william.bowers"
        ),
        React.createElement(
          "span",
          null,
          " [at] "
        ),
        React.createElement(
          "em",
          null,
          "gmail"
        ),
        React.createElement(
          "span",
          null,
          " [dot] "
        ),
        React.createElement(
          "em",
          null,
          "com"
        )
      )
    );
  }
});

module.exports = Header;


},{"./../../core/resource.js":8,"react":"react"}],20:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var screen = _interopRequire(require('./../../lib/screen.js'));

var flatMap = require('./../../lib/fp.js').flatMap;

var themes = [["#F2A199", "#E43664", "#54A0A6", "#5D4C40"], ["#3F95A1", "#5FB0BB", "#E5001A", "#181F22", "#3C5C60"], ["#F90324", "#215DB0"], ["#F8A6AA", "#91C1B4", "#EFC236", "#E3373F", "#A5CD52", "#E05F0B", "#94D9D5", "#674026"]];

var Stripes = React.createClass({
  displayName: "Stripes",

  getDefaultProps: function getDefaultProps() {
    return {
      theme: themes[0],
      colorHeight: 15,
      width: 15
    };
  },

  componentDidMount: function componentDidMount() {
    this.draw();
    screen.on("resize", this.draw);
  },

  componentWillUnmount: function componentWillUnmount() {
    screen.removeListener("resize", this.draw);
  },

  draw: function draw() {
    var _props = this.props;
    var theme = _props.theme;
    var colorHeight = _props.colorHeight;

    var c = this.refs.canvas.getDOMNode();
    var ctx = c.getContext("2d");

    var _screen$size = screen.size();

    var width = _screen$size.width;
    var height = _screen$size.height;

    ctx.clearRect(0, 0, c.width, c.height);
    c.height = height;

    // TODO: Randomize theme to find the best order of colors.

    var y = 0;
    var colors = flatMap(theme, function (color) {
      return [color, "#FFF"];
    });

    for (var i = 0; y < height; i = (i + 1) % colors.length, y += colorHeight) {
      var color = colors[i];
      ctx.fillStyle = color;
      ctx.fillRect(0, y, c.width, colorHeight);
    }
  },

  render: function render() {
    var width = this.props.width;

    var style = {};
    style[this.props.position] = 0;

    return React.createElement("canvas", { className: "Stripes", ref: "canvas", width: width, style: style });
  }
});

module.exports = Stripes;

// [ '#', '#', '#', '#', '#' ],


},{"./../../lib/fp.js":12,"./../../lib/screen.js":15,"react":"react"}]},{},[5]);
