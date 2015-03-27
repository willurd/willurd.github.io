(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"_process":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

var Alt = require("alt");

module.exports = window.alt = new Alt();


},{"alt":"alt"}],4:[function(require,module,exports){
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


},{"./../lib/log.js":12,"./../service/bootstrap.js":14,"./router.js":8,"ga-react-router":"ga-react-router","react":"react"}],5:[function(require,module,exports){
"use strict";

var config = {
  debug: {
    actions: true,
    globals: true,
    logging: true
  }
};

module.exports = config;


},{}],6:[function(require,module,exports){
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


},{"./../lib/http.js":11,"./../lib/log.js":12,"./alt.js":3,"./config.js":5,"./router.js":8,"./title.js":9,"./types.js":10}],7:[function(require,module,exports){
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


},{"path":1}],8:[function(require,module,exports){
"use strict";

var React = require("react");
var Router = require("react-router");
var App = require('./../view/app/App.js');

var Route = Router.Route;

var router = Router.create({
  routes: React.createElement(Route, { handler: App, path: "/" })
});

module.exports = router;


},{"./../view/app/App.js":15,"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
"use strict";

var types = {};

module.exports = types;


},{}],11:[function(require,module,exports){
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


},{"./log.js":12,"superagent":"superagent"}],12:[function(require,module,exports){
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


},{"./../core/config.js":5}],13:[function(require,module,exports){
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


},{"./../core/title.js":9}],14:[function(require,module,exports){
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


},{"./../core/debug.js":6,"q":"q"}],15:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var config = _interopRequire(require('./../../core/config.js'));

var titleMixin = _interopRequire(require('./../../mixin/title.js'));

var RouteHandler = require("react-router").RouteHandler;

var Header = _interopRequire(require('./Header.js'));

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

module.exports = App;


},{"./../../core/config.js":5,"./../../mixin/title.js":13,"./Header.js":16,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
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
    return React.createElement(
      "div",
      { className: "Header" },
      React.createElement(Photo, null),
      React.createElement(
        "h1",
        null,
        "William Bowers"
      )
    );
  }
});

module.exports = Header;


},{"./../../core/resource.js":7,"react":"react"}]},{},[4]);
